const chalk = require('chalk');
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
Episode.belongsTo(Podcast, { foreignKey: 'podcastId' });
Podcast.hasMany(Episode, { foreignKey: 'podcastId' });

exports.fetchCards = (req, res) => {
  const query = {
    where: {
      episode_id: res.locals.episode.id,
    },
  };
  Card.findAll(query).then((cards) => {
    const allCards = cards.map((card) => {
      return card;
    });
    res.send({ results: allCards });
  }).catch((error) => {
    console.log(chalk.red(`error in finding cards: ${error}`));
    res.send(responseFormatter(false, 'failed to fetch cards'));
  });
};

exports.fetchEpisodeId = (req, res, next) => {
  const query = {
    where: {
      guid: req.body.episode_guid,
    },
  };
  Episode.findOne(query).then((episode) => {
    console.log(chalk.cyan('+++line 40: episode found! '), episode.id);
    res.locals.episode_id = episode.id;
    next();
  }).catch((error) => {
    res.send(responseFormatter(false, 'failed to find episode id for card'));
  });
};

// Post create
exports.createCard = (req, res) => {
  const params = paramsForCard(req);
  params.episode_id = res.locals.episode_id;
  Card.create(params)
    .then((card) => {
      res.send(responseFormatter(true, 'card saved', card));
    })
    .catch(() => (
      res.send(responseFormatter(false, 'card failed to save'))
    ));
};

exports.deleteCard = (req, res) => {
  const cardId = req.url.slice(10);
  const query = {
    where: {
      id: cardId,
    },
  };

  Card.destroy(query)
    .then((result) => {
      console.log(chalk.cyan('+++line 73 card destruction success!: '), result);
      res.send({ result });
    })
    .catch(() => (
      res.send(responseFormatter(false, 'card failed to delete'))
    ));
};

exports.updateCard = (req, res) => {
  console.log(chalk.cyan('+++line 82 card.controller: '), req);
  res.send({ update: 'card' });
  // Card.update()
  // .then(()=>{
  //
  // })
  // .catch(() => (
  //   res.send(responseFormatter(false, 'card failed to save'))
  // ));
};

// helpers
function paramsForCard(req) {
  const params = [
    'tagged_timestamp',
    'podcast_id',
    'media_link',
    'media_type',
    'description',
    'button_text',
    'button_link',
  ];
  return filterParams(req, params);
}
