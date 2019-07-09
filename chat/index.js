const express = require('express');
const app = express();
const router = express.Router();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

router.get('*', (req, res) => {
  console.log('connections');

  res.json([
    { id: '1', username: 'Test' }
  ]);
});

router.post('*', (req, res) => {
  console.log('chat post');

});

io.on('connection', socket => {

  console.log('new connection');

});

module.exports = router;
