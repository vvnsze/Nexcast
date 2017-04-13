const express = require('express')
const router = express.Router()
const controller = require('./user.controller')
const passport = require('passport')


router.post('/login', (req, res) => {
	controller.login(req, res)
})

router.get('/user', (req, res) => {
  console.log(req,res)
  res.send('hello Vivian')
	//controller.userById(req, res)
})

router.post('/user', (req, res) => {
  controller.signup(req, res)
})

module.exports = router
