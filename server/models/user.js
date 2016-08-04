const db = require('../db/db');
const utils = require('../services/utils');

const User = {
  // userInfo is an obj w/ username property
  findOne: (userInfo, cb) => {
    const cypher = "MATCH (n:User {username: {username}})"
      + "RETURN (n)";
    db.query(cypher, userInfo, (err, result) => {
      if (err) { return cb(err); }
      cb(null, result[0]);
    });
  },

  checkCredentials: (username, candidatePW, cb) => {
    User.findOne({ username: username }, (err, node) => {
      if (err) {
        return cb(err);
      }
      if (!node) {
        return cb(null, false, { message: 'User does not exist' });
      }
      utils.comparePassword(candidatePW, node.password, (err, isMatch) => {
        if (err) { return cb(err); }
        if (!isMatch) {
          return cb(null, false, { message: 'Wrong password' });
        }
        return cb(null, node);
      });
    });
  },

  // userInfo should be an obj w/ username and pw
  // cb is called w/ 2 params: err and an obj w/ user and token
  signup: (userInfo, cb) => {
    User.findOne(userInfo, (err, result) => {
      if (err) { return cb(err); }
      if (result) {
        // If user exists
        return cb(null, false);
      }
      utils.hashPW(userInfo.password)
        .then(function (hash) {
          const info = {
            username: userInfo.username,
            password: hash
          };
          db.save(info, 'User', function (err, node) {
            if (err) { return cb(err); }
            return cb(null, node.id);
          });
        })
        .catch(function (err) { cb(err); });
    });
  }
}

module.exports = User;