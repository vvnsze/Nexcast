// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('../user/user.model');
// const Podcast = require('../podcast/podcast.model');
const Whitelist = require('../whitelist/whitelist.model');
//

//
// UserPodcast.sync({ force: true });
// User.sync({ force: true });
// Podcast.sync({ force: true });
// Whitelist.sync();

// // User.belongsToMany(Podcast, { through: UserPodcast, foreignKey: 'userId' });
// Podcast.belongsToMany(User, { through: UserPodcast, foreignKey: 'podcastId' });
// Whitelist.create({
//   feedUrl: "http://feed.cnet.com/feed/podcast/next-big-thing/hd.xml",
//   email: "nooysters@gmail.com"
// }).then((success) => {
//   console.log(success)
// })