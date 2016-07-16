const db = require('../db/db');
const utils = require('../services/utils');

const User = {
  findOne: function (username, cb) {
    db.query('match (a:User {username: {username}}) return a', { username: username }, function (err, result) {
      if (err) { cb(err); }
      else { cb(null, result); }
    });
  },

  // userInfo should be an obj with username and pw
  // cb is called with 2 params: err and an obj with user and token
  signup: function (userInfo, cb) {
    utils.hashPW(userInfo.password)
      .then(function (hash) {
        const info = { username: userInfo.username, password: hash };

        db.query('CREATE (n:User {username: {username}}) RETURN n', info, function (err, results) {
          if (err) { cb(err); }
          else { cb(null, results); }
        })
      })
      .catch(function (err) {
        cb(err);
      })
  },

  login: function (info) {
    bcrypt.compare()
  }
}
module.exports = User;