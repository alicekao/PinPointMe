const Places = require('../models/places');
const User = require('../models/user');

module.exports = {
  addNew: (req, res) => {
    const {category} = req.body;
    const data = req.body;
    delete data['category'];

    Places.newPOI(req.user.id, category, data, (err, result, isNew) => {
      if (err) { return res.send(err); }
      result.isNew = isNew;
      res.send(result);
    })
  },


  fetchByUser: (req, res) => {
    const {id} = req.user;
    Places.fetch(id, (err, result) => {
      if (err) { return res.send(err); }
      res.send(result);
    });
  }
}