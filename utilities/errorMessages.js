// errorMessages.js

exports.databaseError = function(res, err){
  res.json({
    status: "error",
    data: err,
  });
};

exports.invalidToken = function (res) {
  res.json({
    status: "error",
    data: "Your token is invalid",
  });
}

exports.characterDoesNotExist = function (res) {
  res.json({
    status: "error",
    data: "That character does not exist"
  });
}

exports.wrongOwnership = function (res) {
  res.json({
    status: "error",
    data: "This is not your character",
  });
}

exports.wrongAuthority = function (res) {
  res.json({
    status: "error",
    data: "You are not allowed to do that",
  });
}

exports.wrongRequest = function (res) {
  res.json({
    status: "error",
    data: "Wrong request",
  });
}