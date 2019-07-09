const User = require('../models/user');
const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;
const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
});

exports.filterUserFields = user => {
  const token = jwt.sign({ id: user.id }, secret);

  return {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    middleName: user.middleName,
    surName: user.surName,
    permission: user.permission,
    access_token: token
  };
};

exports.add = ({ username, password, firstName, middleName, surName, permission }) => new Promise(async (resolve, reject) => {
  try {
    const { error } = Joi.validate({ username, password }, schema);
    if (error) {
      return reject({
        message: error,
        statusCode: 400
      });
    }

    const newUser = new User({
      username,
      password,
      firstName,
      middleName,
      surName,
      permission,
      token: ''
    });
    newUser.setPassword(password);

    const result = await newUser.save();
    const filteredResults = exports.filterUserFields(result);

    // save token in database
    newUser.set({
      token: filteredResults.access_token
    });
    await newUser.save();

    resolve(filteredResults);
  } catch (error) {
    reject(error);
  }
});

exports.edit = (id, { firstName, middleName, surName, permission }) => new Promise(async (resolve, reject) => {
  try {

    const user = await User.findById(id);

    if (!user) {
      reject(new Error('No such user found'));
    }

    user.set({
      firstName,
      middleName,
      surName,
      permission
    });
    const result = await user.save();

    resolve(exports.filterUserFields(result));
  } catch (error) {
    reject(error);
  }
});

exports.delete = (id) => new Promise(async (resolve, reject) => {
  try {
    await User.findByIdAndRemove(id);

    resolve(true);
  } catch (error) {
    reject(error);
  }
});

exports.getAll = () => new Promise(async (resolve, reject) => {
  try {
    const result = await User.find();
    resolve(result.map(user => exports.filterUserFields(user)));
  } catch (error) {
    reject(error);
  }
});
