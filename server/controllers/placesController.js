const Places = require('../models/places');

module.exports = {
  addNew: function (req, res) {
    const data = {
      name: req.body.name,
      location: req.body.location,
      category: req.body.category
    };

    Places.newPOI(data, function (err, result) {
      if (err) { res.send(err); }
      else { res.send(result); }
    })
  },


  fetch: function (req, res) {
    Places.fetch(req.params.id, function(err, result) {
      if (err) { res.send(err);}
      else { res.send(result);}
    })
  }
}