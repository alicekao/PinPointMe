const neo4j = require('neo4j');
const db = new neo4j.GraphDatabase(process.env['GRAPHENEDB_URL'] || 'http://neo4j:pw@localhost:7474');

// user.signup({username: 'test', password: 'pw'});

// const node = db.createNode({name: 'Alice', label: 'User'});

// node.save(function(err, newNode) {
//   if (err) {
//     console.log('err: ', err, err.message);
//   } else {
//     console.log('Saved! ', newNode.id);
//   }
// });

module.exports = db;


