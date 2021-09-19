// auth.model.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: String,
  characters: String,
  password: String,
  email: String,
  authorization: [String],
});

export default mongoose.model('users', userSchema);
const User = module.exports;
module.exports.get = function get(callback, limit) {
  User.find(callback).limit(limit);
};
