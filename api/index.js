const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.post('/saveNewUser', async (req, res) => {
  try {
    const result = await usersCtrl.add({ ...req.body });

    res.json({
      ...result,
      password: '', // empty for security reason
      access_token: '',
      image: '',
      permissionId: ''
    });
  } catch (error) {
    res.errorHandler(error);
  }
});

module.exports = router;
