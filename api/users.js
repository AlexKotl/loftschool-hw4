const usersCtrl = require('../controllers/users');

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
