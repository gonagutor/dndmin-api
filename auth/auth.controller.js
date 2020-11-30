// auth.controller.js

var User = require("./auth.model");
var errorMessages = require("../utilities/errorMessages");
var dotenv = require("dotenv");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
dotenv.config();

exports.auth = function (req, res, callback) {
  const token = req.header('token');
  if (!token) return res.status(401).json({
    status: "error",
    data: "Your token is not set",
  });
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
  } catch (err) {
    errorMessages.invalidToken(res);
  }
}

exports.register = function (req, res) {
  var newUser = new User();
  if (!req.body.username && !req.body.password && !req.password.email)
    return errorMessages.wrongRequest(res);
  newUser.username = req.body.username;
  newUser.characters = "/user/characters/" + newUser.username;
  newUser.password = crypto.createHash("sha512")
    .update(process.env.SALT + req.body.password)
    .digest("hex");
  newUser.email = req.body.email;
  newUser.authorization = 1;
  newUser.verified = 0;
  newUser.creationDate = Date.now();
  newUser.save(function (err, user) {
    if (err)
      errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: "New user created",
    });
  });
};

exports.getToken = function (req, res) {
  if (!req.body.password || !req.body.user)
    return errorMessages.wrongRequest(res);
  User.findOne({ username: req.params.user }, function (err, user) {
    const suposedPassword = crypto
      .createHash("sha512")
      .update(process.env.SALT + req.body.password)
      .digest("hex");
    if (err) return errorMessages.databaseError(res, err);
    if (suposedPassword != user.password) errorMessages.wrongAuthority(res); // Verify password
    const signedToken = jwt.sign({
      username: username,
      authorization: user.authorization
    }, process.env.TOKEN_SECRET);
    res.header('token', signedToken).json({
      status: "success",
      data: verifiedToken,
    });
  });
};
