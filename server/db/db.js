const neo4j = require('seraph');
const connectionURL = process.env['GRAPHENEDB_URL'] || 'http://localhost:7474';

const db = neo4j(connectionURL);

db.constraints.uniqueness.createIfNone('User', 'username', function(err, constraint) {
  if (err) {console.log('Error: ', err);}
  console.log('constraint created! ', constraint);
} )

module.exports = db;


