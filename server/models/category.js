const db = require('../db/db');

module.exports = {
  findOneCategory = function (userID, category, cb) {
    const cypher = `MATCH (n) `
      + `WHERE id(n)=${userID} `
      + `MATCH (n)-[:hasCategory]->(c:Category {categoryName:${category}}) `
      + `RETURN c`;
    db.query(cypher, function (err, categories) {
      if (err) { return cb(err); }
      cb(null, categories[0]);
    });
  },

  saveCategory: function (category, place, userID, cb) {
    Category.findOneCategory(userID, category, function (err, existingCategory) {
      if (err) { return cb(err); }
      if (!result) {
        db.save({ categoryName: category }, 'Category', function (err, newCategory) {
          if (err) { return cb(err); }
          // Relate place to newly created category
          Category.relatePlaceToCategory(place, newCategory, function(err, cat) {
            if (err) { return cb(err); }
          });
        });
      } else {
        // Relate place to existing category
        Category.relatePlaceToCategory(place, existingCategory, function(err, cat) {
          if (err) { return cb(err);}
        });
      }
      // Add category to user's category list
      db.relate(userID, 'hasCategory', existingCategory, null, function (err, rltnshp) {
        if (err) { return cb(err); }
        cb(null, existingCategory)
      });
  });
},

  fetchByUser: function (userID, cb) {
    db.relationships(userID, 'out', 'hasCategory', function (err, rltnshps) {
      if (err) { return cb(err); }
      const categories = [];
      rltnshps.forEach(function (rltnshp, i) {
        db.read(rltnshp.end, function (err, node) {
          if (err) { return cb(err); }
          categories.push(node.categoryName);
          if (i === rltnshps.length - 1) {
            cb(null, categories);
          }
        });
      });
    });
  },

  relatePlaceToCategory: function(place, category, cb) {
    db.relate(place, 'typeof', category, null, function (err, rltnshp) {
      if (err) { return cb(err); }
      cb(null, rltnshp);
    });
  }
}