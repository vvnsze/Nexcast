const express = require('express');
const router = express.Router();
const controller = require('./podcast.controller');

router.post('/api/podcast', (req, res) => {
  controller.findOrCreateByFeedUrl(req, res)
    .then((podcast) => {
      res.send(podcast);
    })
    .catch((error) => {
      console.log('there is an error in findOrCreateByFeedUrl: ', error);
      res.send(error);
    });
});

router.get('/api/list', (req, res) => {
  controller.searchItunes(req, res);
});

router.get('/api/podcast', [
  controller.getPodcasts,
  controller.parsePodcasts,
]);

router.delete('/api/podcast', (req, res) => {
  // controller.signup(req, res);
});

router.get('/api/itunes', [
  controller.searchItunes,
]);

router.post('/api/podcast/verify', [
  controller.verifyPodcast,
  controller.setVerifyUserPodcast,
]);

module.exports = router;
