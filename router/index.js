const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log('Hello');
  res.sendStatus(200);
});

module.exports = router;
