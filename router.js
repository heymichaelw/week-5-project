const wordController = require('./controllers/word-controller');
const express = require('express');
const session = require('express-session');
const helpers = require('./helpers');

module.exports = function(app){
  app.get('/', helpers.randomMiddleware, wordController.random);
  app.post('/', helpers.checkCounterMiddleware, wordController.guess);
  app.get('/end', wordController.lose);
};
