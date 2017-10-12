const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

module.exports = function createWhitelistTable(sequelize, DataTypes) {
  const Whitelist = sequelize.define('whitelist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    podcastTitle: {
      type: DataTypes.STRING(60),
    },
    author: {
      type: DataTypes.STRING(60),
    },
    email: {
      type: DataTypes.STRING(80),
      isEmail: true,
    },
    feedUrl: {
      type: DataTypes.STRING(300),
    },
  });
  return Whitelist;
};
