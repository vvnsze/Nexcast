const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const Card = sequelize.define('episodes', {
  tagged_timestamp: {
    type: Sequelize.TIME,
  },
  description:{
    type: Sequelize.TEXT,
  },
  button_text:{
    type: Sequelize.STRING(50),
  },
  button_link:{
    type: Sequelize.STRING(3000),
  },
  underscored: true,
});

Card.sync();
console.log(chalk.cyan('+++line 19 this is users table in card model: ', Card));

module.exports = Card;
