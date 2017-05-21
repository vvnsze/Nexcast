const FeedMe = require('feedme');
const http = require('http');
const parser = require('rss-parser');
const Axios = require('axios');
const Podcast = require('./podcast.model');
const userPodcast = require('./userPodcast.model');
const Whitelist = require('../whitelist/whitelist.model');
const chalk = require('chalk');

// Declare associations
// TODO refactor this into config file.
Podcast.hasMany(userPodcast, { foreignKey: 'podcastId' });
userPodcast.belongsTo(Podcast, { foreignKey: 'podcastId' });

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
  console.log(chalk.magenta(`this is the userId: ${userId}`));
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
      console.error(chalk.red('+++line 34 there is an error: '), error);
      res.send(error);
    });
};

exports.parsePodcasts = (req, res) => {
  const promiseArray = res.locals.podcastResult.map((podcast) => (
    new Promise((resolve, reject) => {
      parser.parseURL(podcast.feed_url, (err, parsed) => {
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
      feed_url: podcast.feedUrl,
    },
    full_name: podcast.collectionName,
    image_url: podcast.artworkUrl600,
  };

  return Podcast.findOrCreate(query);
};

exports.verifyPodcast = (req, res, next) => {
  const feedUrl = req.body.podcast.feedUrl;

  // Get the feed and parse
  http.get(feedUrl, (resp) => {
    const parsed = new FeedMe(true);
    resp.pipe(parsed);

    parsed.on('end', () => {
      const podcastJSON = parsed.done();
      console.log(chalk.green('this is the podcastJSON email: '), podcastJSON['itunes:owner']['itunes:email']);
      const itunesEmail = podcastJSON['itunes:owner'] ? podcastJSON['itunes:owner']['itunes:email'] : '';
      if (itunesEmail === req.user.email) {
        // The users email matches the feeds itunes email
        // go to next step and mark verified.
        res.locals.verified = true;
        return next();
      } else {
        // If the emails don't match check the whitelist.
        Whitelist.findOne({ where: { feedUrl, email: req.user.email } })
          .then((data) => {
            if (data) {
              // record exists, go to next step and mark verified.
              res.locals.verified = true;
              return next();
            }
            // user email not associated with this podcast
            // send unverified.
            res.locals.verified = false;
            return next();
          })
          .catch((err) => res.status(422).send(err));
      }
    });
  });
};

exports.setVerifyUserPodcast = (req, res, next) => {
  const userId = req.user.id;
  const podcastId = req.body.podcastObj[0].id;
  // There is a podcast shorthand on line 67
  userPodcast.findOrCreate({ where: { userId, podcastId } })
    .then((result) => {
      const userPodcastObj = result[0];
      userPodcastObj.verified = res.locals.verified;
      userPodcastObj.save()
        .then((result) => res.send({ result, verified: res.locals.verified }))
        .catch((error) => { res.status(422).send({ error, message: 'failed to save' }); });
    })
    .catch((error) => { res.status(422).send({ error, message: 'failed to load' }); });
};
