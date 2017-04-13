const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();

// route files
const user = require('./user/user.routes');

// middleware
router.use(cors());
router.use(bodyParser());

// routes
router.use('/', user);

router.use((req, res) => {
  res.status(404).send('Sorry that does not exist');
});

module.exports = router;
