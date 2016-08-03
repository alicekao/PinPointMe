const db = require('../db/db');
const Category = require('./category');

module.exports = {
  // tyepof category: arr
  // data is an obj that has place name, lat, lng, google_id, category, address, vicinity
  newPOI: function (userID, category, data, cb) {
    db.save(data, 'Place', function (err, place) {
      if (err) { return cb(err); }
      // Create new category and relate place and user to it

      Category.saveCategory(category, place, userID, function (err, res) {
        if (err) { cb(err); }
      });

      // Relate user to newly created place
      db.relate(userID, 'likes', place, { on: new Date() }, function (err, relationship) {
        if (err) { return cb(err); }
        cb(null, place);
      });
    });
  },

  // Fetches all places a user likes using the userID
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
      cb(null, result)
    });
  }
}
