const fs = require('fs');
const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');

require('./db');
require('./config/passport');

// include middlewares
const list = fs.readdirSync('./middlewares').sort();
list.forEach(file => {
  app.use(require(`./middlewares/${file}`));
});

app.use('/api', require('./api/index'));
app.use('/', require('./router/index'));

const server = app.listen(port, () => {
  console.log('Server running on localhost:' + port);
});
require('./chat')(server);
