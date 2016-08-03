console.log('is production? ', process.env.NODE.ENV);
var db;
if (process.env.GRAPHENEDB_URL) {

  const url = require('url').parse(process.env.GRAPHENEDB_URL)

  db = require("seraph")({
    server: url.protocol + '//' + url.host,
    user: url.auth.split(':')[0],
    pass: url.auth.split(':')[1]
  });
} else {
  const neo4j = require('seraph');
  const connectionURL = 'http://localhost:7474';
  db = neo4j(connectionURL);
}
db.constraints.uniqueness.createIfNone('User', 'username', function (err, constraint) {
  if (err) { console.log('Error: ', err); }
  console.log('constraint created! ', constraint);
})

module.exports = db;


