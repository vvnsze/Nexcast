// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
// const User = require('../user/user.model');
// const Podcast = require('../podcast/podcast.model');
// const Whitelist = require('../whitelist/whitelist.model');

// const UserPodcast = sequelize.define('userPodcast', {
//   userId: {
//     type: Sequelize.INTEGER,
//   },
//   podcastId: {
//     type: Sequelize.INTEGER,
//   },
// });

// UserPodcast.sync({ force: true });
// User.sync({ force: true });
// Podcast.sync({ force: true });
// Whitelist.sync();

// // User.belongsToMany(Podcast, { through: UserPodcast, foreignKey: 'userId' });
// Podcast.belongsToMany(User, { through: UserPodcast, foreignKey: 'podcastId' });
