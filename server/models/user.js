const db = require('../db/db');
const utils = require('../services/utils');

const User = {
  // userInfo is an obj w/ username property
  findOne: function (userInfo, cb) {
    const cypher = "MATCH (n:User {username: {username}})"
      + "RETURN (n)";
    db.query(cypher, userInfo, function (err, result) {
      if (err) { return cb(err); }
      cb(null, result[0]);
    });
  },

  checkCredentials: function (username, candidatePW, cb) {
    User.findOne({ username: username }, function (err, node) {
      if (err) {
        return cb(err);
      }
      if (!node) {
        return cb(null, false, { message: 'User does not exist' });
      }
      utils.comparePassword(candidatePW, node.password, function (err, isMatch) {
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
  signup: function (userInfo, cb) {
    User.findOne(userInfo, function (err, result) {
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
            console.log('new user is: ', node);
            return cb(null, node.id);
          });
        })
        .catch(function (err) { cb(err); });
    });
  }
}

module.exports = User;