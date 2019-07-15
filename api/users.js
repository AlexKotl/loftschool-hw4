const usersCtrl = require('../controllers/users');
const passport = require('passport');

exports.login = async (req, res, done) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return res.json({
        message: 'Wrong login or password'
      });
    }
    if (user) {
      res.json(usersCtrl.filterUserFields(user));
    }
  })(req, res, done);
};

exports.authFromToken = async (req, res, done) => {
  try {
    const result = await usersCtrl.getByToken(req.body.token);
    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.saveNewUser = async (req, res) => {
  try {
    const result = await usersCtrl.add({ ...req.body });
    console.log('Token for registered user:', result.access_token);

    res.json({
      ...result,
      password: '', // empty for security reason
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
  try {
    const result = await usersCtrl.uploadImage(req.params.id, req.files[req.params.id]);
    res.json(result);
  } catch (error) {
    res.errorHandler(error);
  }
};

exports.updateUserPermission = async (req, res, done) => {
  done();
};
