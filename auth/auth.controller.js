// auth.controller.js

const dotenv = require('dotenv');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const errorMessages = require('../utilities/errorMessages');
const User = require('./auth.model');
const { checkDuplicateByIndex } = require('../utilities/checkDuplicate');

dotenv.config();

/**
 * Checks user identity and Authorizes them to perform the callback
 *
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 * @param {Number} minLevelAuth Minimum authority to perform the action on callback
 * @param {Function} callback What to do when the user is athorised
 */

exports.auth = function auth(req, res, minLevelAuth, callback) {
  const token = req.header('token');
  if (!token) return errorMessages.missingToken(res);
  try {
    const verifiedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    if (verifiedToken.authorization < minLevelAuth) { return errorMessages.wrongAuthority(res); }
    return User.findOne({ username: verifiedToken.username }, (err, user) => {
      if (err) return errorMessages.databaseError(res, err);
      if (!user) return errorMessages.invalidToken(res);
      return callback(req, res, user);
    });
  } catch (err) {
    return errorMessages.invalidToken(res);
  }
};

/**
 * Registers a new user
 *
 * @param {Object} req Express.js request object
 * @param {Object} res Express.js response object
 */

exports.register = function register(req1, res1) {
  if (!req1.body.username && !req1.body.password && !req1.password.email) {
    return errorMessages.wrongRequest(res1);
  }
  return checkDuplicateByIndex(req1, res1, 'username', User, (req2, res2) => {
    checkDuplicateByIndex(req2, res2, 'email', User, (req, res) => {
      const newUser = new User();
      newUser.username = req.body.username;
      newUser.characters = `/user/characters/${newUser.username}`;
      newUser.password = crypto
        .createHash('sha512')
        .update(process.env.SALT + req.body.password)
        .digest('hex');
      newUser.email = req.body.email;
      newUser.authorization = 1;
      newUser.verified = 0;
      newUser.creationDate = Date.now();
      return newUser.save((err) => {
        if (err) errorMessages.databaseError(res, err);
        res.json({
          status: 'success',
          data: 'New user created',
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

exports.getToken = function getToken(req, res) {
  if (!req.body.password || !req.body.user) { return errorMessages.wrongRequest(res); }
  return User.findOne({ username: req.body.user }, (err, user) => {
    const suposedPassword = crypto
      .createHash('sha512')
      .update(process.env.SALT + req.body.password)
      .digest('hex');
    if (err) return errorMessages.databaseError(res, err);
    if (!user) return errorMessages.doesNotExist(res, 'user');
    if (suposedPassword !== user.password) {
      return errorMessages.wrongPassword(res);
    } // Verify password
    const signedToken = jwt.sign(
      {
        username: user.username,
        authorization: user.authorization,
      },
      process.env.TOKEN_SECRET,
    );
    return res.header('token', signedToken).json({
      status: 'success',
      data: signedToken,
    });
  });
};
