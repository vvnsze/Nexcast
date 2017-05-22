const Episode = require('./episode.model');
const chalk = require('chalk');
const Axios = require('axios');


exports.findOrCreatePodcastEpisode = (req, res) => {
  console.log(chalk.cyan('this is the req: '), req.query);
  // Episode.findOrCreate({
  //   where: {
  //     name: req.query.episodeTitle,
  //     podcast_id: req.query.nexcastPodcastId,
  //   }
  // })
  res.send({ cheese: 'pillow' });
}
