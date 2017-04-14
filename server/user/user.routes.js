const express = require('express');
const router = express.Router();
const controller = require('./user.controller');


router.post('/user', (req, res) => {
  console.log('+++line7: rq', req)
  controller.create(req, res);
});

router.get('/user', (req, res) => {
  res.send('+++ line 12: this is get user from user/routes.js');
  // controller.userById(req, res)
});

router.delete('/user', (req, res) => {
  // controller.signup(req, res);
});

module.exports = router;
