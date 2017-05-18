const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Episode = sequelize.define('episodes', {
  podcast_id: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING(100),
  },
  guid: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING(2000),
  },
  underscored: true,
});

Episode.sync();

module.exports = Episode;
