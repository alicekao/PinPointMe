const Places = require('../models/places');
const User = require('../models/user');

module.exports = {
  addNew: function (req, res) {
    const category = req.body.category;
    const data = req.body;
    delete data['category'];

    Places.newPOI(req.user.id, category, data, function (err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    })
  },


  fetchByUser: function (req, res) {
    const id = req.user.id;
    Places.fetch(id, function (err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    });
  }
}