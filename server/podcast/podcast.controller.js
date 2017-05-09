const FeedMe = require('feedme');
const http = require('http')

const Podcast = require('./podcast.model');
const UserPodcast =  require('./UserPodcast.model');

exports.searchItunes = (req, res) => {
  console.log('podcast controller searchItunes: ', req.query);
  res.send({ cheese: 'cheese' });
};

exports.findOrCreateByFeedUrl = (req, res) => {
  const podcast = req.body.podcast
  const query = { 
    where: {
      feed_url: podcast.feedUrl
    },
    full_name: podcast.collectionName, 
    image_url: podcast.artworkUrl600, 
  }

  return Podcast.findOrCreate(query);
}

exports.verifyPodcast = (req, res) => {
  http.get(req.body.podcast.feedUrl, (resp) => {
    const parser = new FeedMe(true);
    resp.pipe(parser);
    parser.on('end', () => {
      const podcastJSON = parser.done();

      if(podcastJSON['itunes:owner']['itunes:email'] === req.user.email) {
        userPodcast.verified = true;
        userPodcast.save().then((result) => {
          res.send({ result, verified: true })
        })
        .catch((error) => {res.status(403).send(error)})
      }
      else {
        res.send({verified: false})
      }
    });
  });
}
