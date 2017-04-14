const express = require('express');
const router = express.Router();
const controller = require('./media.controller');
// const passport = require('passport');


router.post('/media', (req, res) => {
  //controller.login(req, res);
});

router.get('/media', (req, res) => {
  res.send('+++ line 12: this is get media from media/routes.js');
  // controller.userById(req, res)
});

router.get('/media',(req,res)=>{
  res.send('+++line 17 on media.routes.js')
})

router.delete('/media', (req, res) => {
  //controller.signup(req, res);
});

module.exports = router;
