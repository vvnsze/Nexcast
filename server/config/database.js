const chalk = require('chalk');
const dbConfig = require('./initialize');
const sequelize = dbConfig.sequelize;
const models = dbConfig.db;
/* eslint-disable no-console */
sequelize.authenticate()
    .then(() => {
      console.log(chalk.green('Successful Connection to the database'));
    })
    .catch((err) => {
      console.log(chalk.red('+++line 10 config.database.js: cannot connect to the database '), err);
    });

console.log(chalk.magenta('this is in database models: '), models);

module.exports = models;
