const express = require('express');
const router = express.Router();
const episodeController = require('./episode.controller');
const cardController = require('../card/card.controller');


router.get('/api/episode', [
  episodeController.findOrCreatePodcastEpisode,
  cardController.fetchCards,
]);

module.exports = router;
