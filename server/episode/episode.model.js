const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Episode = sequelize.define('episodes', {
  podcastId: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING(100),
  },
  guid: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(4000),
  },
});

// Episode.sync({ force: true });

module.exports = Episode;
