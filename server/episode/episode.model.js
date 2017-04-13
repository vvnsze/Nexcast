const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Episode = sequelize.define('episodes', {
  name: {
    type: Sequelize.STRING(100),
  },
  guid: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.STRING(2000),
  },
  underscored: true,
});

Episode.sync();
console.log(chalk.cyan('+++line 19 this is users table in episode model: ', Episode));

module.exports = Episode;
