const bodyParser = require('body-parser');
const Authentication = require('./authentication/controller');
const passportService = require('./authentication/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use('/api', requireAuth);

  app.get('/api/pie', (req, res) => {
    res.send('hi from pie');
  });

  app.get('/itunes', (req, res) => {
    const searchTerm = req.query;
    console.log('this is searchTerm: ', searchTerm);
    res.send({ cheese: 'pillow' });
    // function getStuff(request) {
    //
    // }
    // getStuff(searchTerm)
  });

  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
