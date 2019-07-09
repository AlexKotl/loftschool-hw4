const express = require('express');
const router = express.Router();
const users = require('./users');
const news = require('./news');

router.post('/login', users.login);
router.post('/authFromToken', users.authFromToken);
router.post('/saveNewUser', users.saveNewUser);
router.get('/getUsers', users.getUsers);
router.put('/updateUser/:id', users.updateUser);
router.delete('/deleteUser/:id', users.deleteUser);
router.post('/saveUserImage/:id', users.saveUserImage);
router.put('/updateUserPermission/:id', users.updateUserPermission);

router.get('/getNews', news.getNews);
router.post('/newNews', news.newNews);
router.put('/updateNews/:id', news.updateNews);
router.delete('/deleteNews/:id', news.deleteNews);

module.exports = router;
