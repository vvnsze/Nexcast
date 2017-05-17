// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('../user/user.model');
// const Podcast = require('../podcast/podcast.model');
// const Whitelist = require('../whitelist/whitelist.model');
// const UserPodcast = require('../podcast/userPodcast.model');
//
//
// UserPodcast.sync({ force: true });
// User.sync({ force: true });
// Podcast.sync({ force: true });
// Whitelist.sync({ force: true });
//
// User.belongsToMany(Podcast, { through: UserPodcast, foreignKey: 'userId' });
// Podcast.belongsToMany(User, { through: UserPodcast, foreignKey: 'podcastId' });

// Whitelist.create({
//   feedUrl: 'http://feeds.feedburner.com/pod-save-america',
//   email: 'vvnsze@gmail.com',
// }).then((success) => {
//   console.log('SUCCESS!:' , success);
// });

// Podcast.create({
//   full_name: 'Nexcast',
//   feed_url: 'http://feeds.feedburner.com/pod-save-america',
//   description: 'sure wish I had some hipster lorem',
//   email: 'vvnsze@gmail.com',
// });
