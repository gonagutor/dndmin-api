// auth.controller.js

var User = require("./auth.model");
var errorMessages = require("../utilities/errorMessages");
var dotenv = require("dotenv");
var crypto = require("crypto");
dotenv.config();

exports.register = function (req, res) {
  var newUser = new User();
  if (
    req.body.username == null &&
    req.body.password == null &&
    req.password.email == null
  ) {
    res.json({
      status: "error",
      dat: "Wrong request",
    });
    return;
  }
  newUser.username = req.body.username;
  newUser.characters = "/user/characters/" + newUser.username;
  newUser.password = crypto
    .createHash("sha512")
    .update(process.env.SALT + req.body.password)
    .digest("hex");
  newUser.token = "";
  newUser.email = req.body.email;
  newUser.authorization = 1;
  newUser.verified = 0;
  newUser.save(function (err, user) {
    if (err)
      errorMessages.databaseError(err);
    res.json({
      status: "success",
      data: "New user created",
    });
  });
};

exports.getToken = function (req, res) {
  if (req.body.password == null) {
    errorMessages.wrongRequest();
    return;
  }
  User.findOne({ username: req.params.user }, function (err, user) {
    if (err)
      errorMessages.databaseError(err);
    else if ( // Verify password
      req.body.password != null &&
      crypto
        .createHash("sha512")
        .update(process.env.SALT + req.body.password)
        .digest("hex") == user.password
    ) {
      if (user.token == null || user.token == "") { // If the token does not exist then create a new one for the user
        user.token = crypto
          .createHash("sha512")
          .update(user.username + user.password)
          .digest("hex");
        user.save(function (err) {
          if (err)
            errorMessages.databaseError(err);
        });
      }
      res.json({
        status: "success",
        data: user.token,
      });
    } else {
      errorMessages.wrongAuthority();
    }
  });
};
