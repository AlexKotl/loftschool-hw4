const usersCtrl = require('../controllers/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;

exports.login = async (req, res, done) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({
        message: 'Wrong login or password'
      });
    }
    if (user) {
      const payload = { id: user.id };
      const token = jwt.sign(payload, secret);
      res.json({ err: false, token: token });
    }
  })(req, res, next);
};

exports.authFromToken = async (req, res, done) => {
  done();
};

exports.saveNewUser = async (req, res) => {
  try {
    const result = await usersCtrl.add({ ...req.body });
    const token = jwt.sign({ id: result.id }, secret);

    res.json({
      ...result,
      password: '', // empty for security reason
      access_token: token,
      image: '',
      permissionId: ''
    });
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await usersCtrl.delete(req.params.id);
    res.json({
      message: 'User deleted'
    });
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const result = await usersCtrl.getAll();

    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.updateUser = async (req, res, done) => {
  try {
    const result = await usersCtrl.edit(req.params.id, { ...req.body });
    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.saveUserImage = async (req, res, done) => {
  done();
};

exports.updateUserPermission = async (req, res, done) => {
  done();
};
