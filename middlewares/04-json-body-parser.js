module.exports = (req, res, next) => {
  // if JSON received - parse it
  if (req.body[0] === '{') {
    req.body = JSON.parse(req.body);
  }
  next();
};
