const User = require('../models/user');

const filterUserFields = user => {
  delete user['password'];
  return user;
};

exports.add = ({ username, password }) => new Promise(async (resolve, reject) => {
  try {
    // const { error, value } = Joi.validate({ username, email, password }, schema);
    // if (error) {
    //   return reject({
    //     message: error,
    //     statusCode: 400
    //   });
    // }

    const newUser = new User({
      username,
      password
    });

    const result = await newUser.save();

    resolve(filterUserFields(result));
  } catch (error) {
    reject(error);
  }
});
