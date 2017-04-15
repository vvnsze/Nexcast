const User = require('./user.model');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

module.exports = {
  create: (req, res) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    .then((user) => res.status(200).send({ user: user[0], token: tokenForUser(user) }))
    .catch((error) => res.status(401).send(error));
  },
  delete: (req, res) => {
    res.send('not implemented yet');
  }
};
