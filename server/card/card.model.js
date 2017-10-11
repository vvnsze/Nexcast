module.exports = function createCardTable(sequelize, DataTypes) {
  const Cards = sequelize.define('card', {
    taggedTimestamp: {
      type: DataTypes.STRING(12),
    },
    podcastId: {
      type: DataTypes.INTEGER,
    },
    episodeId: {
      type: DataTypes.INTEGER,
    },
    mediaLink: {
      type: DataTypes.TEXT,
    },
    mediaType: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    buttonText: {
      type: DataTypes.STRING(50),
    },
    buttonLink: {
      type: DataTypes.STRING(3000),
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false',
    },
  },
    {
      classMethods: {
        associate: function (models) {
          Cards.belongsTo(models.Podcasts, { foreignKey: 'podcastId' });
          Cards.belongsTo(models.Episodes, { foreignKey: 'episodeId' });
        },
      },
      underscored: true,
    }
  );
  return Cards;
};

// Card.sync({ force: true });
