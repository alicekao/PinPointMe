const db = require('../db/db');
const utils = require('../services/utils');

const User = {
  findOne: function (userInfo, cb) {
    db.query('MATCH (n:User {username: {username}}) RETURN n', userInfo, function (err, result) {
      if (err) { cb(err); }
      else { cb(null, result); }
    });
  },

  // userInfo should be an obj with username and pw
  // cb is called with 2 params: err and an obj with user and token
  signup: function (userInfo, cb) {
    User.findOne(userInfo, function (err, result) {
      if (err) {
        cb(err)
      }
      else if (Object.keys(result)) {
        // If user exists
        cb(null, false)
      } else {
        utils.hashPW(userInfo.password)
          .then(function (hash) {
            const info = { username: userInfo.username, password: hash };

            db.query('CREATE (n:User {username: {username}}) RETURN n', info, function (err, results) {
              if (err) { cb(err); }
              else { 
                const id = results[0].n._data.metadata.id;
                cb(null, id); }
            })
          })
          .catch(function (err) {
            cb(err);
          })
      }
    })
  },

  login: function (info) {
    bcrypt.compare()
  }
}
module.exports = User;