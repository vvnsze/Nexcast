const Sequelize = require('sequelize')

const db = new Sequelize('postgres://vvnsze@localhost:5432/nexcast')

db.authenticate()
    .then(function(err) {
        console.log('Successful Connection to the database');
    })
    .catch(function(err) {
        console.log('+++line 10 config.database.js: cannot connect to the database ', err);
    });

module.exports = db;
