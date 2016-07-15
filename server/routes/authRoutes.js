const User = require('../models/user');
const utils = require('../services/utils');

module.exports = function (router) {

  router.post('/signin', function (req, res) {
    console.log(req.body);
    
    res.send('success');
  });

  router.post('/signup', function (req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password
    };
    
    User.signup(data, function(err, result) {
      if (err) {res.send(err);}

      const id = result[0].n._data.metadata.id;
      const resp = {
        id: id,
        token: utils.generateToken(id)
      };

      console.log(resp);
      res.send(resp);
    });
  });
}