const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const jwt = require('jwt-simple');
const secret = process.env.SECRET;

module.exports = {
  comparePassword: function(candidatePW, actualPW, cb) {
    bcrypt.compare(candidatePW, actualPW, function(err, isMatch) {
      if (err) { return cb(err);}
      cb(null, isMatch)
    })
  },

  hashPW: function (password) {
    return bcrypt.genSaltAsync(10)
      .then(function (salt) {
        return bcrypt.hashAsync(password, salt, null)
      });
  },

  generateToken: function(username) {
    const timestamp = new Date().getTime();
    return jwt.encode({iat: timestamp, sub: username}, secret);
  }
}