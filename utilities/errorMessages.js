// errorMessages.js

exports.databaseError = function (res, err) {
  res.status(500).json({
    status: "error",
    data: err,
  });
};

exports.invalidToken = function (res) {
  res.status(401).json({
    status: "error",
    data: "Your token is invalid",
  });
};

exports.missingToken = function (res) {
  res.status(401).json({
    status: "error",
    data: "Your token is not set",
  });
};

exports.wrongPassword = function (res) {
  res.status(401).json({
    status: "error",
    data: "Your password is incorrect",
  });
};

exports.doesNotExist = function (res, whatStr) {
  res.status(404).json({
    status: "error",
    data: "That " + whatStr + " does not exist",
  });
};

exports.wrongOwnership = function (res) {
  res.status(401).json({
    status: "error",
    data: "This is not your character",
  });
};

exports.wrongAuthority = function (res) {
  res.status(401).json({
    status: "error",
    data: "You are not allowed to do that",
  });
};

exports.wrongRequest = function (res) {
  res.status(400).json({
    status: "error",
    data: "Wrong request",
  });
};
