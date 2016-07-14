const express = require('express');
const http = require('http');
const middleware = require('./server/middleware');

const app = express();
middleware(app);

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, function(err) {
  if (err) {
    console.log('Error: ', err);
  } else {
    console.log('Server now listening on port ', port);
  }
});
