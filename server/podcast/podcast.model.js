const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Podcast = sequelize.define('podcasts', {
  full_name: {
    type: Sequelize.STRING(100),
  },
  feed_url:{
    type: Sequelize.INTEGER
  },
  description:{
    type: Sequelize.STRING(2000)
  },
  image_url:{
    type: Sequelize.
  },
  email:{
    type: Sequelize.STRING(80),
    isEmail: true,
  },
  verified:{
    type: Sequelize.BOOLEAN(),
  },
  underscored: true,
});

Podcast.sync();
console.log(chalk.cyan('+++line 19 this is users table in podcast model: ', Podcast));

module.exports = Podcast;
