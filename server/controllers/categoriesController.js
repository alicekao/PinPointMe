const Category = require('../models/category');

module.exports = {
  fetchByUser: (req, res) => {
    Category.fetchByUser(req.user.id, (err, results) => {
      if (err) {return res.send(err);}
      res.send(results);
    });
  }
}