const usersCtrl = require('../controllers/users');

exports.login = async (req, res, done) => {
  done();
};

exports.authFromToken = async (req, res, done) => {
  done();
};

exports.saveNewUser = async (req, res) => {
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

exports.deleteUser = async (req, res, done) => {
  done();
};

exports.saveUserImage = async (req, res, done) => {
  done();
};

exports.updateUserPermission = async (req, res, done) => {
  done();
};
