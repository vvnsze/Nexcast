const express = require('express');
const router = express.Router();
const controller = require('./episode.controller');

router.get('/episodes', (req, res) => {
  res.send('get episode endpoint');
});

module.exports = router;
