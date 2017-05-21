const chalk = require('chalk');
const Axios = require('axios');


exports.findOrCreatePodcastEpisode = (req, res) => {
  console.log(chalk.cyan('this is the req: '), req.query);
  res.send({ cheese: 'pillow' });
}
