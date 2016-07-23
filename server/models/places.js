const db = require('../db/db');

module.exports = {
  // data is an obj that has username, place lat/lng/ name/location/category
  newPOI: function (userID, data, cb) {
    console.log('data is: ', data);
    db.save(data, 'Place', function(err, place) {
        if (err) {
          console.log('error: ', err);
          return cb(err);
        }
        db.relate(userID, 'likes', place, {on: new Date()}, function(err, relationship) {
          if (err) {return cb(err);}
          console.log('success!', place, relationship);
          cb(null, place);
        });
    });
  },

  // userID is a number
  fetch: function (userID, cb) {
    const cypher = `MATCH (n) `
                  + `WHERE id(n)=${userID} `
                  + `MATCH (n)-[:likes]->(p) `
                  + `RETURN (p)`;
    db.query(cypher, function(err, result) {
      if (err) { 
        console.log('error', err);
        return cb(err); }
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
