const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const sendConfirmationEmail = require('../services/mailgun');

const User = sequelize.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
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
  confirmationToken: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  instanceMethods: {
    comparePassword: function compare(candidatePassword, callback) {
      return bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) { return callback(err); }
        return callback(null, isMatch);
      });
    },
  },
  hooks: {
    beforeCreate: function hashPassword(_user, options, cb) {
      const user = _user;
      return bcrypt.genSalt(10, (err, salt) => {
        if (err) { return cb(err, null); }
        return bcrypt.hash(user.password, salt, (error, hash) => {
          if (error) { return error; }
          user.password = hash;
          return bcrypt.hash(user.email, salt, (_error, _hash) => {
            if (_error) { return _error; }
            user.confirmationToken = _hash;
            return cb(null, options);
          });
        });
      });
    },
    afterCreate: function emailConfirm(_user) {
      sendConfirmationEmail(_user);
    },
  },
});

module.exports = User;
