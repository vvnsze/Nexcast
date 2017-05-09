const Podcast = require('./podcast.model')
const UserPodcast =  require('./UserPodcast.model')

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

exports.verifyPodcast = (Podcast, User, res) => {
  UserPodcast.findOrCreate({ 
    where: { userId: User.id, podcastId: Podcast.id } 
  })
    .then((userPodcast) => {   
      if(Podcast.email === User.email) {
        userPodcast.verified = true;
        return userPodcast.save();
      }
    })
    .catch((err) => ( res.send(error) ));
}