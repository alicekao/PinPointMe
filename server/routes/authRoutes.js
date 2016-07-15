const Authentication = require('../controllers/authController');

module.exports = function (router) {
  router.post('/signin', Authentication.signin);
  router.post('/signup', Authentication.signup);
}