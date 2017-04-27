const express = require('express');
const router = express.Router();
const controller = require('./podcast.controller');
// const passport = require('passport');


router.post('/podcast', (req, res) => {

  // controller.login(req, res);
});

router.get('/list', (req, res) => {
  controller.searchItunes(req, res);
});

router.get('/podcast', (req, res) => {
  res.send('get podcast!');
  // controller.userById(req, res)
});

router.delete('/podcast', (req, res) => {
  // controller.signup(req, res);
});

module.exports = router;
