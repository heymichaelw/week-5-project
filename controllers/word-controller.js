const Words = require('../models/words');
const session = require('express-session');

module.exports = {
  list: function(req, res){
    res.render('index', {model: Words.data});
  },
  random: function(req, res){
    res.render('index', {model: req.session.random,
    array: req.session.array, message: req.session.message});
  },
  guess: function(req, res){
    delete req.session.message;
    var guess = (req.body.guess).toLowerCase();
    if (!req.session.guessed.includes(guess)) {
      req.session.guessed.push(guess);
    } else {
      req.session.message = "You've already guessed that!";
    }
    if (req.session.random.includes(guess)) {
      var indices = [];
      for (var i = 0; i < req.session.random.length; i++) {
        if (req.session.random[i] === guess) {
          indices.push(i);
        }
      }
      for (var t = 0; t < indices.length; t++) {
        var position = Number(indices[t]);
        req.session.array[position] = guess;
      }
      if (!req.session.array.includes('_')) {
        res.redirect('/win');
      }
    } else {
      (req.session.counter)++;
      console.log(req.session.counter);
    }
    res.render('index', {model: req.session.random,
    array: req.session.array, guessed: req.session.guessed, message: req.session.message});
  },
  lose: function(req, res){
    delete req.session.random;
    delete req.session.array;
    delete req.session.guessed;
    delete req.session.counter;
    res.render('end');
  },
  win: function(req, res){
    res.render('win');
  }
};
