const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

module.exports = function createPodcastTable(sequelize, DataTypes) {
  const Podcasts = sequelize.define('podcasts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(100),
    },
    feedUrl: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(2000),
    },
    imageUrl: {
      type: DataTypes.STRING(2680),
    },
    email: {
      type: DataTypes.STRING(80),
      isEmail: true,
    },
  },
    {
      classMethods: {
        associate: function (models) {
          Podcasts.hasMany(models.UserPodcast, { foreignKey: 'podcastId' });
          Podcasts.hasMany(models.Episodes, { foreignKey: 'podcastId' });
          Podcasts.hasMany(models.Cards, { foreignKey: 'podcastId' });
        },
      },
    }
  );
  return Podcasts;
};
