const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Media = sequelize.define('media', {
  type: {
    type: Sequelize.STRING(60),
  },
  link: {
    type: Sequelize.STRING(2083),
    notNull: true,
  },
  underscored: true,
});

Media.sync();
console.log(chalk.cyan('+++line 52 this is users table in Media model: ', Media));

module.exports = Media;
