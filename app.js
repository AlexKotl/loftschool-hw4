const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 3000;

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(bodyParser.json({
  type: '*/*' // parse all responces as frontend not passing proper content-type
}));

require('./db');
require('./config/passport');

// include middlewares
const list = fs.readdirSync('./middlewares').sort();
list.forEach(file => {
  app.use(require(`./middlewares/${file}`));
});

app.use('/api', require('./api/index'));
app.use('/socket.io', require('./chat/index'));
app.use('/', require('./router/index'));


app.listen(port, () => {
  console.log('Server running on localhost:' + port);
});
