const express = require('express');
const mustacheExpress = require('mustache-express');
const routes = require('./router.js');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use(session({
  secret : 'secretword',
  resave : false,
  saveUninitialized : true
}));

routes(app);

app.listen(3000);
