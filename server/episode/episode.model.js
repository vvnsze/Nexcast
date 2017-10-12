module.exports = function createEpisodeTable(sequelize, DataTypes) {
  const Episodes = sequelize.define('episodes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true,
    },
    podcastId: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    guid: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING(4000),
    },
  },
    {
      classMethods: {
        associate: function (models) {
          Episodes.hasMany(models.Cards, { foreignKey: 'episodeId' });
          Episodes.belongsTo(models.Podcasts, { foreignKey: 'podcastId' });
        },
      },
    });
  return Episodes;
};

// Episode.sync({ force: true });
