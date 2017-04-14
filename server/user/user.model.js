const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');

const User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING(60),
  },
  email: {
    type: Sequelize.STRING(80),
    isEmail: true,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

// User.sync();
console.log(chalk.cyan('+++line 52 this is users table in users model: ', User));

module.exports = User;
