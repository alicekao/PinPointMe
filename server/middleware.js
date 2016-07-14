const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = function (app) {
  app.use(morgan('dev'));
  app.use(bodyParser.json({ type: '*/*' }));

  app.use(express.static(path.join(__dirname, '../src')))
};