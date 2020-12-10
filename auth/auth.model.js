// auth.model.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  characters: String,
  password: String,
  token: String,
  email: String,
  authorization: Number,
  verified: Boolean,
});
module.exports = mongoose.model('users', userSchema);
const User = module.exports;
module.exports.get = function get(callback, limit) {
  User.find(callback).limit(limit);
};
