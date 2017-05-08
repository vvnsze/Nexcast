const bodyParser = require('body-parser');
const Authentication = require('./authentication/controller');
const passport = require('passport');
const Axios = require('axios');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const FeedMe = require('feedme');
const http = require('http');

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

  app.get('/podcastverification', (req, response) => {
    http.get(req.query.feedUrl, (res) => {
      const parser = new FeedMe(true);
      res.pipe(parser);
      parser.on('end', () => {
        const podcastJSON = parser.done();
        console.log('this is podcastJSON: ', podcastJSON['itunes:owner']);
        // response.send({ apple: podcastJSON });
      });
    });
    response.send({ apple: 'pie' });
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/verify-user-account', Authentication.verifyUserAccount);
};
