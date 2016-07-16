const User = require('../models/user');
const utils = require('../services/utils');

module.exports = {
  signin: function (req, res) {
    console.log(req.body);

    res.send('success');
  },

  signup: function (req, res) {
    const data = {
      username: req.body.username,
      password: req.body.password
    };

    User.signup(data, function (err, newId) {
      if (err) { res.send(err); }
      else if (!newId) {
        res.send({ error: 'Username already exists' });
      } else {

        const resp = {
          id: newId,
          token: utils.generateToken(newId)
        };

        res.send(resp);
      }
    });
  }
}