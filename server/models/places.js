const db = require('../db/db');

module.exports = {
  // data is an obj that has username, place lat/lng/ name/location/category
  newPOI: function (data, cb) {
    db.query(
      'MATCH (user:User {username: {username}}) CREATE (user)-[:LIKES]->(place:Place {name: {name}, location: [{lat}, {lng}], category: {category}}) RETURN place', data, function (err, place) {
        if (err) {
          console.log('error: ', err);
          return cb(err);
        }
        console.log('success!', place);
        cb(null, place);
      });
  },

  // username is a str
  fetch: function (username, cb) {
    db.query('MATCH (:User {username: {username}})-[:LIKES]->(places) RETURN places', { username: username }, function (err, places) {
      if (err) { cb(err); }
      else {
        const converted = places.map(function (place) {
          return place.places.data;
        });
        cb(null, converted);
      }
    })
  },

  // data is an obj with username and category name
  addCategory: function (data, cb) {
    console.log('data in here is: ', data);
    db.query('MATCH (n:User {username: {username}}) CREATE (n)-[:HASCATEGORY]->(c:Category {name: {name}}) RETURN c', data, function (err, category) {
      if (err) { return cb(err); }
      cb(null, category);
    });
  }
};
