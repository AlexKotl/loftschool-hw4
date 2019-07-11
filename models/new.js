const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: {
    type: String
  },
  theme: {
    type: String
  },
  date: {
    type: Date
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = mongoose.model('New', schema);
