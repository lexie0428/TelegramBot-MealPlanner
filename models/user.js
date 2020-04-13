const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: Number, unique: true},
  firstName: { type: String },
  sex: {type: String},
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  activity: { type: String },
  calories: {type: Number},
  diet: {type: String},
  exceptions: {type: String},
  purpose: {type: String}
});

module.exports = mongoose.model('users', userSchema);

