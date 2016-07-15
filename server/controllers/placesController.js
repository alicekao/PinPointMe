module.exports = {
  addNew: function (req, res) {
    console.log(req.body);
    res.send('success!');
  }
}