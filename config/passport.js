const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
  secretOrKey: 'verysecret',
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
};

passport.use(
  new LocalStrategy(
    {
      // usernameField: 'email',
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      User.findOne({ username })
        .then(user => {
          if (!user) {
            return done(new Error('User not found'));
          }
          if (!user.validPassword(password)) {
            return done(new Error('Incorrect password'));
          }
          return done(null, user);
        })
        .catch(err => done(err));
    }
  )
);

passport.use(
  new Strategy(params, function (payload, done) {
    User.find({ id: payload.id })
      .then(user => {
        if (!user) {
          return done(new Error('User not found'));
        }
        return done(null, { id: user.id });
      })
      .catch(err => done(err));
  })
);
