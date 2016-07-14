const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

module.exports = function (app) {
  if (process.env.NODE_ENV !== 'production') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
  }
  
  app.use(bodyParser.json({ type: '*/*' }));

  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
  });
};