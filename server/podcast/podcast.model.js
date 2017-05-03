const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Podcast = sequelize.define('podcasts', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  full_name: {
    type: Sequelize.STRING(100),
  },
  feed_url: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING(2000),
  },
  image_url: {
    type: Sequelize.STRING(2680),
  },
  email: {
    type: Sequelize.STRING(80),
    isEmail: true,
  },
  verified: {
    type: Sequelize.BOOLEAN,
  },
}, {
  underscored: true,
});

module.exports = Podcast;
