const User = require('../user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config/config.js');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp },config.secret);
}

module.exports = {
  create: (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (er, hash) => {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        })
        .then((user) => res.status(200).send({ user, token:tokenForUser(user) }))
        .catch((error) => res.status(401).send(error));
      });
    });
  },
  delete: (req, res) => {
    res.send('not implemented yet');
  },
  show: (req, res) => {
    res.send('not implemented yet');
  },
};
