const Episode = require('../config/database').Episodes;
const chalk = require('chalk');
const responseFormatter = require('../helpers/util').responseFormatter;

exports.findOrCreatePodcastEpisode = (req, res, next) => {
  const query = {
    where: {
      podcastId: req.query.nexcastPodcastId,
      name: req.query.episodeTitle,
      guid: req.query.guid,
      description: req.query.description,
    },
  };

  Episode.findOrCreate(query).then((episode) => {
    res.locals.episode = episode[0];
    next();
  }).catch((error) => {
    console.log(chalk.red(`+++episode controller: there is an error: ${error}`));
    res.send(responseFormatter(false, 'episode could not be found or created'));
  });
};
