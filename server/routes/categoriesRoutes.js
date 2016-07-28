const Categories = require('../controllers/categoriesController');
const passport = require('passport');
const requireJwt = passport.authenticate('jwt', {session: false});

module.exports = function(router) {
  router.get('/fetchByUser', requireJwt, Categories.fetchByUser);
}