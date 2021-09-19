// errorMessages.js

exports.databaseError = function databaseError(res, err) {
  res.status(500).json({
    status: 'error',
    data: err,
  });
};

exports.invalidToken = function invalidToken(res) {
  res.status(401).json({
    status: 'error',
    data: 'Your token is invalid',
  });
};

exports.missingToken = function missingToken(res) {
  res.status(401).json({
    status: 'error',
    data: 'Your token is not set',
  });
};

exports.wrongPassword = function wrongPassword(res) {
  res.status(401).json({
    status: 'error',
    data: 'Your password is incorrect',
  });
};

exports.doesNotExist = function doesNotExist(res, whatStr) {
  res.status(404).json({
    status: 'error',
    data: `That ${whatStr} does not exist`,
  });
};

exports.wrongOwnership = function wrongOwnership(res) {
  res.status(401).json({
    status: 'error',
    data: 'This is not your character',
  });
};

exports.wrongAuthority = function wrongAuthority(res) {
  res.status(401).json({
    status: 'error',
    data: 'You are not allowed to do that',
  });
};

exports.wrongRequest = function wrongRequest(res) {
  res.status(400).json({
    status: 'error',
    data: 'Wrong request',
  });
};

exports.duplicateKey = function duplicateKey(res, key) {
  res.status(400).json({
    status: 'error',
    data: `Can't add key ${key} as it already exists`,
  });
};
