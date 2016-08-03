const db = require('../db/db');

var Category = {
  // Find one user's category by name. tyepof userID: num, typeof category: str
  findOneCategory: (userID, category, cb) => {
    console.log('category is', category);
    const cypher = `MATCH (n) `
      + `WHERE id(n)=${userID} `
      + `MATCH (n)-[:hasCategory]->(c:Category {categoryName:'${category}'}) `
      + `RETURN c`;
    db.query(cypher, (err, categories) => {
      if (err) { return cb(err); }
      console.log('In findone: ', category, categories);
      cb(null, categories[0]);
    });
  },

  saveCategory: (category, place, userID, cb) => {
    Category.findOneCategory(userID, category, (err, existingCategory) => {
      if (err) { return cb(err); }
      if (!existingCategory) {
        db.save({ categoryName: category }, 'Category', (err, newCategory) => {
          if (err) { return cb(err); }
          // Relate place to newly created category
          Category.relatePlaceToCategory(place, newCategory, (err, cat) => {
            if (err) { return cb(err); }
          });
          // Add category to user's category list
          db.relate(userID, 'hasCategory', newCategory, null, (err, rltnshp) => {
            if (err) { return cb(err); }
            cb(null, newCategory, true)
          });
        });
      } else {
        // Relate place to existing category
        Category.relatePlaceToCategory(place, existingCategory, (err, cat) => {
          if (err) { return cb(err);}
          cb(null, existingCategory, false);
        });
      }
    });
  },

  // Fetch all categories for a user. tyeof userID: num
  fetchByUser: function (userID, cb) {
    const cypher = 
    `MATCH (n:User)-[:hasCategory]->(c:Category) `
    + `WHERE id(n)=${userID} `
    + `RETURN (c)`;
    db.query(cypher, function(err, categories) {
      if (err) { return cb(err);}
      cb(null, categories);
    });
    // db.relationships(userID, 'out', 'hasCategory', function (err, rltnshps) {
    //   if (err) { return cb(err); }
    //   const categories = [];
    //   rltnshps.forEach(function (rltnshp, i) {
    //     db.read(rltnshp.end, function (err, node) {
    //       if (err) { return cb(err); }
    //       categories.push(node.categoryName);
    //       if (i === rltnshps.length - 1) {
    //         cb(null, categories);
    //       }
    //     });
    //   });
    // });
  },

  relatePlaceToCategory: function(place, category, cb) {
    db.relate(place, 'typeof', category, null, function (err, rltnshp) {
      if (err) { return cb(err); }
      cb(null, rltnshp);
    });
  }
};

module.exports = Category;