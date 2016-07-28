const db = require('../db/db');

module.exports = {
  saveCategory: function (category, place, userID, cb) {
    db.save({ categoryName: category }, 'Category', function (err, category) {
      if (err) { return cb(err); }
      db.relate(place, 'typeof', category, null, function (err, rltnshp) {
        if (err) { return cb(err); }
      });

      // Relate user to newly created category
      db.relate(userID, 'hasCategory', category, null, function (err, rltnshp) {
        if (err) { return cb(err); }
      });
    });
  },

  fetchByUser: function (userID, cb) {
    db.relationships(userID, 'out', 'hasCategory', function (err, rltnshps) {
      if (err) { return cb(err); }
      const categories = [];
      rltnshps.forEach(function (rltnshp) {
        db.read(rltnshp.end, function (err, node) {
          if (err) { return cb(err); }
          categories.push(node.categoryName);
        });
      });
      cb(null, categories);
    });
  }
}