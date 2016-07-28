const Category = require('../models/Category');

module.exports = {
  fetchByUser: function(req, res) {
    Category.fetchByUser(req.user.id, function(err, results) {
      if (err) {return res.send(err);}
      res.send(results);
    });
  }
}