const neo4j = require('seraph');
const connectionURL = process.env['GRAPHENEDB_URL'] || 'http://localhost:7474';

const db = neo4j(connectionURL);

module.exports = db;


