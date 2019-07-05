const express = require('express');
const router = express.Router();
const users = require('./users');

router.post('/saveNewUser', users.saveNewUser);
router.get('/getUsers', users.getUsers);

module.exports = router;
