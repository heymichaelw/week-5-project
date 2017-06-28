const Words = require('../models/words');
const session = require('express-session');

module.exports = {
  list: function(req, res){
    res.render('index', {model: Words.data});
  },
  random: function(req, res){
    res.render('index', {model: req.session.random,
    array: req.session.array});
  },
  guess: function(req, res){
    if (req.session.random.includes(req.body.guess)) {
      req.session.guessed.push(req.body.guess);
      var indices = [];
      for (var i = 0; i < req.session.random.length; i++) {
        if (req.session.random[i] === req.body.guess) {
          indices.push(i);
        }
      }
      for (var t = 0; t < indices.length; t++) {
        var position = Number(indices[t]);
        req.session.array[position] = req.body.guess;
      }
    } else {
      (req.session.counter)++;
      console.log(req.session.counter);
    }
    res.render('index', {model: req.session.random,
    array: req.session.array, guessed: req.session.guessed});
  },
  lose: function(req, res){
    delete req.session.random;
    delete req.session.array;
    delete req.session.guessed;
    delete req.session.counter;
    res.render('end');
  }
};
