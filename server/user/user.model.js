const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const chalk = require('chalk');
const bcrypt = require('bcrypt');

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
  },
}, {
  instanceMethods: {
    comparePassword: function(candidatePassword, callback) {
      bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
      });
    }
  },
  hooks: {
    beforeCreate: function(user, options, cb) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) { return err; }
          // overwrite plain text password with encrypted password
          user.password = hash;
          cb(null,options)
        });
      });
    }
  }
});





// User.sync();
console.log(chalk.cyan('+++line 52 this is users table in users model: ', User));

module.exports = User;
