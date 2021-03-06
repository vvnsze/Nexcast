const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

module.exports = function createUserPodcast(sequelize, DataTypes) {
  const UserPodcast = sequelize.define('userPodcast', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    podcastId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
    {
      classMethods: {
        associate: function (models) {
          UserPodcast.belongsTo(models.Podcasts, { foreignKey: 'podcastId' });
        },
      }
    });
  return UserPodcast;
};
