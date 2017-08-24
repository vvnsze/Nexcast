const express = require('express');
const router = express.Router();
const controller = require('./card.controller');

router.post('/api/card', [
  controller.fetchEpisodeId,
  controller.createCard,
]);

router.put('/api/card/:id', [
  controller.updateCard,
]);

router.get('/api/cards');

router.delete('/api/card/:id', [
  controller.deleteCard,
]);

module.exports = router;
