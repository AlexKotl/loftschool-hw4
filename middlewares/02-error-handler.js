module.exports = (req, res, next) => {
  res.errorHandler = (err) => {
    res.status(err.statusCode || 500).json({
      message: err ? (err.message || err).toString() : 'Internal Error'
    });
  };

  next();
};
