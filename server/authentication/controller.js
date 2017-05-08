const jwt = require('jwt-simple');
const User = require('../user/user.model');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
};

exports.signin = (req, res) => {
  res.send({ user: req.user, token: tokenForUser(req.user) });
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

exports.verifyUserAccount = (req, res) => {
  const token = req.params.t;
  User.findOne({ confirmationToken: token })
    .then((user) => {
      const suser = user;
      user.update({ isVerified: true })
        .then(() => {
          res.redirect(`/searchpodcast?t=${suser.id}`);
        });
    });
};
