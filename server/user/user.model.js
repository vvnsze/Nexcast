// const Sequelize = require('sequelize');
// const sequelize = require('../config/database');
const bcrypt = require('bcrypt');
const confirmation = require('../services/mailgun');

module.exports = function createUserTable(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(60),
    },
    email: {
      type: DataTypes.STRING(80),
      isEmail: true,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    confirmationToken: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
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
        confirmation.sendConfirmationEmail(_user);
      },
    },
  });
  return User;
};
