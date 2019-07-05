const User = require('../models/user');

const filterUserFields = user => {
  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    middleName: user.middleName,
    surName: user.surName,
    permission: user.permission
  };
};

exports.add = ({ username, password, firstName, middleName, surName, permission }) => new Promise(async (resolve, reject) => {
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
      password,
      firstName,
      middleName,
      surName,
      permission
    });

    const result = await newUser.save();

    resolve(filterUserFields(result));
  } catch (error) {
    reject(error);
  }
});
