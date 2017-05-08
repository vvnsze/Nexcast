const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_URI);
/* eslint-disable no-console */
db.authenticate()
    .then(() => {
      console.log('Successful Connection to the database');
    })
    .catch((err) => {
      console.log('+++line 10 config.database.js: cannot connect to the database ', err);
    });

module.exports = db;
