const express = require('express');
const router = express.Router();
const controller = require('./podcast.controller');
const Axios = require('axios');

router.post('/api/podcast', (req, res) => {
  console.log(req.body.podcast);
  controller.findOrCreateByFeedUrl(req, res)
    .then((podcast) => {
      res.send(podcast);
    })
    .catch((error) => { res.send(error); });
});

router.get('/api/list', (req, res) => {
  controller.searchItunes(req, res);
});

router.get('/api/podcast', (req, res) => {
  res.send('get podcast!');
  // controller.userById(req, res)
});

router.delete('/api/podcast', (req, res) => {
  // controller.signup(req, res);
});

router.get('/api/itunes', (req, res) => {
  const searchTerm = req.query.term;
  const url = `https://itunes.apple.com/search?entity=podcast&term=${searchTerm}`;
  Axios({
    method: 'get',
    url,
  }).then((response) => {
    res.send({ podcasts: response.data });
  }).catch((e) => {
    res.send(e);
  });
});

router.post('/api/podcast/verify', controller.verifyPodcast);

module.exports = router;
