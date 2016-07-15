const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const localLogin = new LocalStrategy(
  function (username, password, done) {
    User.findOne(username, function (err, result) {
      if (err) {
        return done(err);
      }
      if (!result) {
        // If doesn't exist
        return done(null, false, { message: 'User does not exist' });
      }
      // If wrong password
      return done(null, false, { message: 'Wrong password' })
      // Else
      return done(null, user)

    });
  }
);

passport.use(localLogin);
