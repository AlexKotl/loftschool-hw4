const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.post('/saveNewUser', async (req, res) => {
  try {
    const result = await usersCtrl.add({ ...req.body });
    res.json({
      data: result
    });
  } catch (error) {
    res.errorHandler(error);
  }
});

module.exports = router;
