const Sequelize = require('sequelize');
// const sequelize = require('../config/database');

module.exports = function createCardTable(sequelize, DataTypes) {
  const Cards = sequelize.define('card', {
    tagged_timestamp: {
      type: DataTypes.STRING(12),
    },
    podcast_id: {
      type: DataTypes.INTEGER,
    },
    episode_id: {
      type: DataTypes.INTEGER,
    },
    media_link: {
      type: DataTypes.TEXT,
    },
    media_type: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    button_text: {
      type: DataTypes.STRING(50),
    },
    button_link: {
      type: DataTypes.STRING(3000),
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: 'false',
    },
  },
    {
      classMethods: {
        associate: function (models) {
          Cards.belongsTo(models.Podcasts, { foreignKey: 'podcast_id' });
          Cards.belongsTo(models.Episodes, { foreignKey: 'episode_id' });
        },
      },
    },
    {
      underscored: true,
    }
  );
  return Cards;
};

// Card.sync({ force: true });
