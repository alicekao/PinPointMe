const Places = require('../controllers/placesController');
const passport = require('passport');
const requireJwt = passport.authenticate('jwt', {session: false});

module.exports = function(router) {
  router.post('/new', requireJwt, Places.addNew);
  router.get('/fetchAll', requireJwt, Places.fetch);
}