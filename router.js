const wordController = require('./controllers/word-controller');
const express = require('express');

module.exports = function(app){
  app.get('/', wordController.list);
  app.get('/random', wordController.random);
};
