const express = require('express');
const mustacheExpress = require('mustache-express');
const routes = require('./router.js');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', './views');

routes(app);

app.listen(3000);
