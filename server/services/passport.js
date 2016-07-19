const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const secret = process.env.SECRET;

const localLogin = new LocalStrategy(
  function (username, password, done) {
    User.checkCredentials(username, password, done);
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findOne({ username: payload.sub }, function (err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }
    return done(null, user);
  });
})

passport.use(localLogin);
passport.use(jwtLogin);
