const express = require('express');
const router = express.Router();

const returnError = (err, res) => {
  res.status(err.statusCode || 500).json({
    message: err ? (err.message || err).toString() : "Internal Error"
  });
};

router.use('/saveNewUser', (req, res) => {
  try {
    res.json({
      data: 'OK'
    });
  } catch (error) {
    returnError(error);
  }
});

module.exports = router;
