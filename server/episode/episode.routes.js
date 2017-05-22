const express = require('express');
const router = express.Router();
const controller = require('./episode.controller');

router.get('/api/episode', [
  controller.findOrCreatePodcastEpisode,
]);

module.exports = router;
