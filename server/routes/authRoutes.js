const Authentication = require('../controllers/authController');
const passportServices = require('../services/passport');
const passport = require('passport');

const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (router) {
  router.post('/signin', requireSignIn, Authentication.signin);
  router.post('/signup', Authentication.signup);
}