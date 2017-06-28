const Words = require('./models/words');
const session = require('express-session');
const express = require('express');

const app = express();

app.use(session({
  secret : 'secretword',
  resave : false,
  saveUninitialized : true
}));

function getRandomWord(){
  function getRandomInt(min, max){
    min = Math.ceil(0);
    max = Math.floor(Words.data.length);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const randNum = getRandomInt();
  const randWord = Words.data[randNum];
  return randWord;
}

module.exports = {
  randomMiddleware: function(req, res, next){
    if (!req.session.random) {
      req.session.random = getRandomWord();
    }
    var emptyArray = [];
    var guessedArray = [];
    var counter = 0;
    if (!req.session.guessed) {
      req.session.guessed = guessedArray;
    }
    for (var i = 0; i < req.session.random.length; i++) {
      emptyArray.push("_");
    }
    if (!req.session.array) {
      req.session.array = emptyArray;
    }
    if (!req.session.counter) {
      req.session.counter = counter;
    }
    next();
  },
  checkCounterMiddleware: function(req, res, next){
    if (req.session.counter >= 3) {
      console.log('Exceeded!');
      res.redirect('/end');
    }
    next();
  }
};
