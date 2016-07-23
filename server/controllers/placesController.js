const Places = require('../models/places');
const User = require('../models/user');

module.exports = {
  addNew: function (req, res) {
    const data = {
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      category: req.body.category
    };

    Places.newPOI(req.user.id, data, function (err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    })
  },


  fetch: function (req, res) {
    const id = req.user.id;
    Places.fetch(id, function (err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    });
  },

  addCategory: function (req, res) {
    const data = {
      username: req.user.username,
      name: req.body.name
    };
    Places.addCategory(data, function (err, category) {
      if (err) { return res.send(err); }
      res.send(category);
    });
  }
}