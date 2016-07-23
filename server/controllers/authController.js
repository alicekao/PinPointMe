const User = require('../models/user');
const utils = require('../services/utils');

module.exports = {
  signin: function (req, res) {
    res.send({token: utils.generateToken(req.body.username)});
  },

  signup: function (req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password
    };

    User.signup(data, function (err, newId) {
      if (err) { return res.send(err); }
      if (!newId) {
        return res.status(422).send({ error: 'Username already exists' });
      }
      const resp = {
        token: utils.generateToken(req.body.username)
      };

      res.send(resp);
    });
  }
}