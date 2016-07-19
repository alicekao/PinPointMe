const db = require('../db/db');

module.exports = {
  // data needs username, place lat/lng/ name/location/category
  newPOI: function (data, cb) {
    db.query(
      'MATCH (user:User {username: {username}}) CREATE (user)-[:LIKES]->(place:Place {name: {name}, location: [{lng}, {lat}], category: {category}}) RETURN place', data, function (err, result) {
      if (err) { return cb(err); }
      console.log('success!', result);
      cb(null, result);
    });
  },

  fetch: function (username, cb) {
    db.query('MATCH (:User {username: {username}})-[:LIKES]->(places) RETURN places', {username: username}, function (err, result) {
      if (err) { cb(err); }
      else { cb(null, result); }
    })
  }
};
