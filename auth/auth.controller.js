// auth.controller.js

var User = require("./auth.model");
var errorMessages = require("../utilities/errorMessages");
var dotenv = require("dotenv");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
const { checkDuplicateByIndex } = require("../utilities/checkDuplicate");
dotenv.config();

/**
 * Checks user identity and Authorizes them to perform the callback
 *
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 * @param {Number} minLevelAuth Minimum authority to perform the action on callback
 * @param {Function} callback What to do when the user is athorised
 */

exports.auth = function (req, res, minLevelAuth, callback) {
  const token = req.header("token");
  if (!token) return errorMessages.missingToken(res);
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verifiedToken.authorization < minLevelAuth)
      return errorMessages.wrongAuthority(res);
    User.findOne({ username: verifiedToken.username }, function (err, user) {
      if (err) return errorMessages.databaseError(res, err);
      if (!user) return errorMessages.invalidToken(res);
      callback(req, res, user);
    });
  } catch (err) {
    errorMessages.invalidToken(res);
  }
};

/**
 * Registers a new user
 *
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 */

exports.register = function (req, res) {
  if (!req.body.username && !req.body.password && !req.password.email)
    return errorMessages.wrongRequest(res);
  checkDuplicateByIndex(req, res, "username", User, function (req, res) {
    checkDuplicateByIndex(req, res, "email", User, function (req, res) {
      var newUser = new User();
      newUser.username = req.body.username;
      newUser.characters = "/user/characters/" + newUser.username;
      newUser.password = crypto
        .createHash("sha512")
        .update(process.env.SALT + req.body.password)
        .digest("hex");
      newUser.email = req.body.email;
      newUser.authorization = 1;
      newUser.verified = 0;
      newUser.creationDate = Date.now();
      newUser.save(function (err, user) {
        if (err) errorMessages.databaseError(res, err);
        res.json({
          status: "success",
          data: "New user created",
        });
      });
    });
  });
};

/**
 * Sets user's header with their token using jwt and sends the token using json
 *
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 */

exports.getToken = function (req, res) {
  if (!req.body.password || !req.body.user)
    return errorMessages.wrongRequest(res);
  User.findOne({ username: req.body.user }, function (err, user) {
    const suposedPassword = crypto
      .createHash("sha512")
      .update(process.env.SALT + req.body.password)
      .digest("hex");
    if (err) return errorMessages.databaseError(res, err);
    if (suposedPassword != user.password) errorMessages.wrongPassword(res); // Verify password
    const signedToken = jwt.sign(
      {
        username: user.username,
        authorization: user.authorization,
      },
      process.env.TOKEN_SECRET
    );
    res.header("token", signedToken).json({
      status: "success",
      data: signedToken,
    });
  });
};
