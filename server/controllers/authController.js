const User = require('../models/user');
const utils = require('../services/utils');

module.exports = {
  signin: (req, res) => {
    res.send({token: utils.generateToken(req.body.username), id: req.user.id});
  },

  signup: (req, res) => {
    const { username, password} = req.body;

    const data = {
      username,
      password
    };

    User.signup(data, (err, newId) => {
      if (err) { return res.send(err); }
      if (!newId) {
        return res.status(422).send({ error: 'Username already exists' });
      }
      const resp = {
        token: utils.generateToken(req.body.username)
      };
      console.log('new token', resp);
      res.send(resp);
    });
  }
}