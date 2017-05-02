const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Whitelist = sequelize.define('whitelist', {
  podcastTitle: {
    type: Sequelize.STRING(60),
  },
  author: {
    type: Sequelize.STRING(60),
  },
  email: {
    type: Sequelize.STRING(80),
    isEmail: true,
  },
  feedUrl: {
    type: Sequelize.STRING(300),
  },
});

Whitelist.sync();

module.exports = Whitelist;
