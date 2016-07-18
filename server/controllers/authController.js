const User = require('../models/user');
const utils = require('../services/utils');

module.exports = {
  signin: function (req, res) {
    User.checkCredentials(req.body, function(err, isValid) {
      if (err) { return res.send(err); }
      res.send(isValid)
    })
  },

  signup: function (req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password
    };

    User.signup(data, function (err, newId) {
      if (err) { return res.send(err); }
      if (!newId) {
        return res.send({ error: 'Username already exists' });
      }
      const resp = {
        id: newId,
        token: utils.generateToken(newId)
      };

      res.send(resp);
    });
  }
}