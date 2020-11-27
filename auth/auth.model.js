// auth.model.js

var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  username: String,
  characters: String,
  password: String,
  token: String,
  email: String,
  authorization: Number,
  verified: Boolean,
});

var User = (module.exports = mongoose.model("users", userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};
