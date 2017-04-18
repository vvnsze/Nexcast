const config = require('../config/config.js');
const jwt = require('jwt-simple');
const User = require('../user/user.model');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res) => {
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(422).send({ error: 'You must provide email and password' });
  }

  User.findOne({ where: { email } })
  .then((user) => {
    if (user) {
      res.status(422).send({ error: 'Email is in use' });
    }

    User.create({ name, email, password })
    .then((_user) => {
      res.status(200).send({
        user: _user, token: tokenForUser(_user),
      });
    })
    .catch((err) => res.status(401).send(err));
  });
};
