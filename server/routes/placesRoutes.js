module.exports = function(router) {
  router.post('/new', function(req, res) {
    console.log(req.body);
    res.send('success!');
  });
}