const db = require('../db/db');

module.exports = {
  // data is an obj that has place lat/lng/ name/location/category
  newPOI: function (userID, category, data, cb) {
    db.save(data, 'Place', function (err, place) {
      if (err) { return cb(err); }

      // Create new category and relate place to it
      db.save({ categoryName: category }, 'Category', function (err, category) {
        if (err) { return cb(err); }
        db.relate(place, 'typeof', category, null, function (err, rltnshp) {
          if (err) { return cb(err); }
        });

        // Relate user to newly created category
        db.relate(userID, 'hasCategory', category, null, function (err, rltnshp) {
          if (err) { return cb(err); }
        })
      });

      // Relate user to newly created place
      db.relate(userID, 'likes', place, { on: new Date() }, function (err, relationship) {
        if (err) { return cb(err); }
        cb(null, place);
      });
    });
  },

  // Fetches all places a user likes using the userID is a number
  fetch: function (userID, cb) {
    const cypher = `MATCH (n) `
      + `WHERE id(n)=${userID} `
      + `MATCH (n)-[:likes]->(p) `
      + `RETURN (p)`;
    db.query(cypher, function (err, result) {
      if (err) {
        console.log('error', err);
        return cb(err);
      }
      console.log('found results!', result);
      cb(null, result)
    });
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
