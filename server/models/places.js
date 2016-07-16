const db = require('../db/db');

module.exports = {
  newPOI: function (data, cb) {
    db.query('CREATE (n:Place {name: {name}, location: {location}, category: {category}})', data, function (err, result) {
      console.log('result is: ', result);
      if (err) { cb(err); }
      else { cb(null, result); }
    });
  }
};
