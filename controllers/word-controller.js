const Words = require('../models/words');

module.exports = {
  list: function(req, res){
    res.render('index', {model: Words.data});
  },
  random: function(req, res){
    function getRandomInt(min, max){
      min = Math.ceil(0);
      max = Math.floor(Words.data.length);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    const randNum = getRandomInt();
    console.log(randNum);
    const randWord = Words.data[randNum];
    res.render('index', {model: randWord});
  }
};
