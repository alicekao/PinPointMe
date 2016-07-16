const Places = require('../controllers/placesController');

module.exports = function(router) {
  router.post('/new', Places.addNew);
  router.get('/fetchForId/:id', Places.fetch);
}