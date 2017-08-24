const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Card = sequelize.define('card', {
  tagged_timestamp: {
    type: Sequelize.STRING(12),
  },
  podcast_id: {
    type: Sequelize.INTEGER,
  },
  episode_id: {
    type: Sequelize.INTEGER,
  },
  media_link: {
    type: Sequelize.TEXT,
  },
  media_type: {
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  button_text: {
    type: Sequelize.STRING(50),
  },
  button_link: {
    type: Sequelize.STRING(3000),
  },
},
  {
    underscored: true,
  }
);

// Card.sync({ force: true });

module.exports = Card;
