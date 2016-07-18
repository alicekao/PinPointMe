const db = require('../db/db');
const utils = require('../services/utils');

const User = {
  // userInfo is an obj w/ username property
  findOne: function (userInfo, cb) {
    db.query('MATCH (n:User {username: {username}}) RETURN n', userInfo, function (err, result) {
      if (err) { return cb(err); }
      cb(null, result[0]);
    });
  },

  // userInfo is an obj w/ username and password
  checkCredentials: function (userInfo, cb) {
    const candidatePW = userInfo.password;
    User.findOne(userInfo, function (err, user) {
      if (err) { return cb(err); }
      if (!user) {
        return cb(null, {error: 'user not found'});
      }
      utils.comparePassword(candidatePW, user.n.data.password, function(err, isMatch) {
        if (err) {return cb(err);}
        cb(null, isMatch);
      });
    });
  },

  // userInfo should be an obj w/ username and pw
  // cb is called w/ 2 params: err and an obj w/ user and token
  signup: function (userInfo, cb) {
    User.findOne(userInfo, function (err, result) {
      if (err) {return cb(err);}
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
          db.query('CREATE (n:User {username: {username}, password: {password}}) RETURN n', info, function (err, results) {
            if (err) { return cb(err); }
            const id = results[0].n.id;
            return cb(null, id);
          })
        })
        .catch(function (err) {cb(err);});
    })
  }
}

module.exports = User;