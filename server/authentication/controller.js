const config = require('../config/config.js');
const jwt = require('jwt-simple');
const User = require('../user/user.model');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send( { error: 'You must provide email and password'} );
  }

  // See if a user with the given email exists
  User.findOne( { where: { email: email } } )
  .then((user) => {
    if (user) {
      return res.status(422).send({ error: 'Email is in use' });
    } else {
      User.create({
        name: name,
        email: email,
        password: password,
      })
      .then((user) => {
        res.status(200).send( {
          user: user, token: tokenForUser(user),
        } )
      })
      .catch((err) => res.status(401).send(err));
    }
  })
}
