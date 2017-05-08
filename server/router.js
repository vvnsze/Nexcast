const bodyParser = require('body-parser');
const Authentication = require('./authentication/controller');
const passport = require('passport');
const Axios = require('axios');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function baseRoutes(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api', requireAuth);

  app.get('/itunes', (req, res) => {
    const searchTerm = req.query.term;
    const url = `https://itunes.apple.com/search?entity=podcast&term=${searchTerm}`;

    Axios({
      method: 'get',
      url,
    }).then((response) => {
      res.send({ podcasts: response.data });
    }).catch((e) => {
      res.send(e);
    });
  });

  app.get('/podcastverification', (req, res) => {
    res.send({ apple: 'pie' });
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/verify-user-account', Authentication.verifyUserAccount);
};
