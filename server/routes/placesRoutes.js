const Places = require('../controllers/placesController');

module.exports = function(router) {
  router.post('/new', Places.addNew);
}