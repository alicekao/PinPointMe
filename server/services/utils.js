const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const jwt = require('jwt-simple');
const secret = process.env.SECRET;

module.exports = {
  comparePassword: (candidatePW, actualPW, cb) => {
    bcrypt.compare(candidatePW, actualPW, (err, isMatch) => {
      if (err) { return cb(err); }
      cb(null, isMatch)
    })
  },

  hashPW: password => {
    return bcrypt.genSaltAsync(10)
      .then(salt => {
        return bcrypt.hashAsync(password, salt, null)
      });
  },

  generateToken: username => {
    const timestamp = new Date().getTime();
    return jwt.encode({ iat: timestamp, sub: username }, secret);
  }
}