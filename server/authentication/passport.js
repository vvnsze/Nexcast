const passport = require('passport');
const User = require('../config/database').Users;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) { return done(null, false); }

      user.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, user);
      });
      return false;
    })
    .catch((err) => (done(err, false)));
});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET,
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub).then((user) => {
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
  .catch((err) => (done(err, false)));
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
