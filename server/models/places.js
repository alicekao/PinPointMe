const db = require('../db/db');
const Category = require('./category');

module.exports = {
  // tyepof category: arr
  // data is an obj that has place name, lat, lng, google_id, category, address, vicinity
  newPOI: function (userID, category, data, cb) {
    db.save(data, 'Place', function (err, place) {
      if (err) { return cb(err); }

      // Relate user to newly created place
      db.relate(userID, 'likes', place, { on: new Date() }, function (err, relationship) {
        if (err) { return cb(err); }
      });
      // Create new category and relate place and user to it

      Category.saveCategory(category, place, userID, (err, res, isNew) => {
        if (err) { cb(err); }
        cb(null, res, isNew);
      });
    });
  },

  // Fetches all places a user likes using the userID
  fetch: function (userID, cb) {
    const cypher = `MATCH (n:User)-[:likes]->(p:Place)-[:typeof]->(c:Category) `
      + `WHERE id(n)=${userID} `
      + `RETURN p,c`;
    db.query(cypher, function (err, result) {
      if (err) {
        console.log('error', err);
        return cb(err);
      }
      const mapped = result.map(item => {
        item.p['category'] = item.c.categoryName;
        item.p['categoryID'] = item.c.id;
        return item.p;
      });
      cb(null, mapped)
    });
  }
}
