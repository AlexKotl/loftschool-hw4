const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  middleName: {
    type: String
  },
  surName: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  permission: {
    type: Array
  }
});

module.exports = mongoose.model('User', schema);
