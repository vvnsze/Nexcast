const chalk = require('chalk');
const Card = require('../config/database').Cards;
const Podcast = require('../config/database').Podcasts;
const Episode = require('../config/database').Episodes;
const responseFormatter = require('../helpers/util').responseFormatter;
const filterParams = require('../helpers/util').filterParams;

exports.fetchCards = (req, res) => {
  const query = {
    where: {
      episodeId: res.locals.episode.id,
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
    res.locals.episodeId = episode.id;
    next();
  }).catch((error) => {
    res.send(responseFormatter(false, 'failed to find episode id for card'));
  });
};

exports.createCard = (req, res) => {
  const params = paramsForCard(req);
  params.episodeId = res.locals.episodeId;
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
      res.send({ result });
    })
    .catch(() => (
      res.send(responseFormatter(false, 'card failed to delete'))
    ));
};

exports.updateCard = (req, res) => {
  const query = paramsForCard(req);
  const cardId = { id: req.params.id };

  Card.update(query, { where: cardId })
  .then((card) => {
    res.send(responseFormatter(true, 'card updated', card[0]));
  })
  .catch(() => (
    res.send(responseFormatter(false, 'card failed to save'))
  ));
};

exports.publishCards = (req, res) => {
  Card.update({
    isPublished: true,
  }, {
    where: {
      id: req.body.ids,
    },
  }).then((success) => {
    res.send(responseFormatter(true, 'cards published', success[0]));
  }).catch(() => {
    res.send(responseFormatter(false, 'card failed to be published'));
  });
};


// helpers
function paramsForCard(req) {
  const params = [
    'taggedTimestamp',
    'podcastId',
    'mediaLink',
    'mediaType',
    'description',
    'buttonText',
    'buttonLink',
  ];
  return filterParams(req, params);
}
