const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const UserPodcast = sequelize.define('userPodcast', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  podcastId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = UserPodcast;
