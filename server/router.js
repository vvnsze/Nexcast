const bodyParser = require('body-parser');
const Authentication = require('./authentication/controller');
const passport = require('passport');
const Axios = require('axios');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const podcast = require('./podcast/podcast.routes');

module.exports = function baseRoutes(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api', requireAuth);
  
  app.use(podcast);

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/verify-user-account', Authentication.verifyUserAccount);
};
