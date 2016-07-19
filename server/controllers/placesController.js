const Places = require('../models/places');
const User = require('../models/user');

module.exports = {
  addNew: function (req, res) {
    const data = {
      username: req.user.n.data.username,
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      category: req.body.category
    };

    Places.newPOI(data, function (err, result) {
      if (err) { return res.send(err); }
      res.send(result);
    })
  },


  fetch: function (req, res) {
    Places.fetch(req.user.n.data.username, function(err, result) {
      if (err) { res.send(err);}
      else { res.send(result);}
    });
  }
}