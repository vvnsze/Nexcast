const FeedMe = require('feedme');
const request = require('request');
const parser = require('rss-parser');
const Axios = require('axios');
const Podcast = require('../config/database').Podcasts;
const userPodcast = require('../config/database').UserPodcast;
const Whitelist = require('../config/database').Whitelist;
const confirmation = require('../services/mailgun');
const chalk = require('chalk');

exports.searchItunes = (req, res) => {
  const searchTerm = req.query.term;
  const url = `https://itunes.apple.com/search?entity=podcast&term=${searchTerm}`;
  Axios({
    method: 'get',
    url,
  }).then((response) => {
    res.send({ podcasts: response.data });
  }).catch((e) => {
    res.send(e);
  });
};

exports.getPodcasts = (req, res, next) => {
  const userId = req.user.id;
  const query = {
    where: {
      userId,
      verified: true,
    },
    include: [Podcast],
  };
  userPodcast.findAll(query)
    .then((result) => {
      res.locals.podcastResult = result.map((item) => item.podcast);
      next();
    }).catch((error) => {
      res.send(error);
    });
};

exports.parsePodcasts = (req, res) => {
  const promiseArray = res.locals.podcastResult.map((podcast) => (
    new Promise((resolve, reject) => {
      parser.parseURL(podcast.feedUrl, (err, parsed) => {
        if (err) reject(err);
        resolve({
          title: parsed.feed.title,
          description: parsed.feed.description,
          itunes: parsed.feed.itunes,
          entries: parsed.feed.entries,
          nexcastObjId: podcast.id,
        });
      });
    })
  ));

  Promise.all(promiseArray).then((result) => {
    res.send({ result });
  });
};

exports.findOrCreateByFeedUrl = (req, res) => {
  const podcast = req.body.podcast;
  const query = {
    where: {
      feedUrl: podcast.feedUrl,
    },
    defaults: {
      fullName: podcast.collectionName,
      imageUrl: podcast.artworkUrl600,

    },
  };
  return Podcast.findOrCreate(query);
};

exports.verifyPodcast = (req, res, next) => {
  const feedUrl = req.body.podcast.feedUrl;
  const feedTitle = req.body.podcast.collectionName;
  request.get(feedUrl).on('response', (resp) => {
    const parsed = new FeedMe(true);
    resp.pipe(parsed);

    parsed.on('end', () => {
      const podcastJSON = parsed.done();
      const itunesEmail = podcastJSON['itunes:owner'] ? podcastJSON['itunes:owner']['itunes:email'] : '';

      if (itunesEmail === req.user.email) {
        // The users email matches the feeds itunes email
        // go to next step and mark verified.
        res.locals.verified = true;
        confirmation.podcastEmailMatched(req.user.email, feedTitle);
        return next();
      } else {
        // If the emails don't match check the whitelist.
        Whitelist.findOne({ where: { feedUrl, email: req.user.email } })
          .then((data) => {
            if (data) {
              // record exists, go to next step and mark verified.
              res.locals.verified = true;
              confirmation.podcastEmailMatched(req.user.email, feedTitle)
              return next();
            }
            // user email not associated with this podcast
            // send unverified.
            res.locals.verified = false;
            confirmation.podcastEmailPending(req.user.id, req.user.email, { title: feedTitle, email: itunesEmail, feed: feedUrl });
            return next();
          })
          .catch((error) => (
            res.status(422).send({ error, message: 'failed to load' })
          ));
      }
    });
  }).on('error', (error) => (res.send({ error })));
};

exports.setVerifyUserPodcast = (req, res) => {
  const userId = req.user.id;
  const podcastId = req.body.podcastObj[0].id;
  userPodcast.findOrCreate({ where: { userId, podcastId } })
    .then((result) => {
      const userPodcastObj = result[0];
      userPodcastObj.verified = res.locals.verified;
      userPodcastObj.save()
        .then((results) => res.send({ results, verified: res.locals.verified }))
        .catch((error) => {
          console.log(chalk.red('error in setVerifyUserPodcast: '), error);
          res.status(422).send({ error, message: 'failed to save' });
        });
    })
    .catch((error) => (res.status(422).send({ error, message: 'failed to load' })));
};

// Verify user to podcast through email
exports.verifyUserPodcast = (req, res) => {
  const confirmed = req.query.confirm;
  const usersId = req.query.userId;
  const podcastsTitle = req.query.title;
  const usersEmail = req.query.email;
  Podcast.findOne({ where: { feedUrl: req.query.feed } }).then((pod) => {
    userPodcast.findOrCreate({ where: { userId: usersId, podcastId: pod.id } })
      .then((result) => {
        const userPodcastObj = result[0];
        userPodcastObj.verified = confirmed;
        userPodcastObj.save()
          .then((success) => {
            confirmation.podcastEmailMatched(usersEmail, podcastsTitle);
            res.send({ success, verified: confirmed });
          }).catch((error) => { res.status(422).send({ error, message: 'failed to save' }); });
      })
      .catch((error) => { res.status(422).send({ error, message: 'failed to load' }); });
  }).catch((err) => {
    res.send({ err });
  });
};
