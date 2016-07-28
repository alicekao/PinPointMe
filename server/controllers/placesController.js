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
    console.log('req in controler', req.user);
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