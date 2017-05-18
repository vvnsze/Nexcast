const Card = require('./card.model');
const Podcast = require('../podcast/podcast.model');
const Episode = require('../episode/episode.model');
const responseFormatter = require('../helpers/util').responseFormatter;
const filterParams = require('../helpers/util').filterParams;

// associations
Card.belongsTo(Podcast, { foreignKey: 'podcast_id' });
Card.belongsTo(Episode, { foreignKey: 'episode_id' });
Podcast.hasMany(Card, { foreignKey: 'podcast_id' });
Episode.hasMany(Card, { foreignKey: 'episode_id' });
Episode.belongsTo(Podcast, { foreignKey: 'podcast_id' });
Podcast.hasMany(Episode, { foreignKey: 'podcast_id' });

// Post create
exports.createCard = (req, res, next) => {
  Card.create(paramsForCard(req))
    .then((card) => (
      res.send(responseFormatter(true, 'card saved', card))
    ))
    .catch((err) => (
      res.send(responseFormatter(false, 'card failed to save'))
    ));
};

// helpers
function paramsForCard(req) {
  const params = [
    'podcast_id',
    'episode_id',
    'media_link',
    'media_type',
    'description',
    'button_text',
    'button_link',
  ];

  return filterParams(req, params);
}
