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

  fetch: function (id, cb) {
    db.query('MATCH (n:Place) RETURN n', null, function (err, result) {
      if (err) { cb(err); }
      else { cb(null, result); }
    })
  }
};
