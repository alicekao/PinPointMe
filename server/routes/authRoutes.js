module.exports = function (router) {

  router.post('/signin', function (req, res) {
    console.log(req.body);
    res.send('success');
  });

  router.post('/signup', function (req, res) {
    res.send('success');
  });
}