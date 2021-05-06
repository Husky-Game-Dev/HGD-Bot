const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
  name: String,
  userID: String,
  point: Number,
});

module.exports = mongoose.model('Data', dataSchema);