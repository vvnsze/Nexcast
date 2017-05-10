const FeedMe = require('feedme');
const http = require('http');

const Podcast = require('./podcast.model');
const userPodcast = require('./userPodcast.model');
const Whitelist = require('../whitelist/whitelist.model');

exports.searchItunes = (req, res) => {
  //console.log('podcast controller searchItunes: ', req.query);
  res.send({ cheese: 'cheese' });
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
    const parser = new FeedMe(true);
    resp.pipe(parser);

    parser.on('end', () => {
      const podcastJSON = parser.done();

      if (podcastJSON['itunes:owner']['itunes:email'] === req.user.email) {
        // The users email matches the feeds itunes email
        // go to next step and mark verified.
        return next();
      } else {

        // If the emails don't match check the whitelist.
        Whitelist.findOne({ where: { feedUrl, email: req.user.email } })
          .then((data) => {
            if (data) {
              // record exists, go to next step and mark verified.
              return next();
            }
            // user email not associated with this podcast
            // send unverified.
            return res.send({ verified: false })
          })
          .catch((err) => {
            return res.status(422).send(err);
          }); 
      }
    });
  });
};

exports.setVerifyUserPodcast = (req, res, next) => {
  const userId = req.user.id;
  const podcastId = req.body.podcastObj[0].id;

  userPodcast.findOrCreate({ where: { userId: userId, podcastId: podcastId } })
    .then((result) => {
      const userPodcastObj = result[0];
      userPodcastObj.verified = true;
      userPodcastObj.save()
        .then((result) => {

          return res.send({ result, verified: true });
        })
        .catch((error) => { res.status(422).send({ error, message: 'failed to save' }) });
    })
    .catch((error) => { res.status(422).send({ error, message: 'failed to load' }) });
};