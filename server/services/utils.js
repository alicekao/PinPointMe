const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const jwt = require('jwt-simple');
const config = require('../config');

module.exports = {
  hashPW: function (password) {
    return bcrypt.genSaltAsync(10)
      .then(function (salt) {
        return bcrypt.hashAsync(password, salt, null)
      });
  },

  generateToken: function(id) {
    const timestamp = new Date().getTime();
    return jwt.encode({iat: timestamp, sub: id}, config.secret);
  }
}