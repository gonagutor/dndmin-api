const Features = require("../features/features.model");
const errorMessage = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");

exports.index = function (req, res) {
  Features.get(function (err, features) {
    if (err) errorMessage.databaseError(res, err);
    res.json({
      status: "success",
      data: features,
    });
  });
};
exports.find = function (req, res) {
  Features.find({ index: req.params.index }, function (err, features) {
    if (err) return errorMessage.databaseError(res, err);
    if (!features) return errorMessage.doesNotExist(res, "Feature");
    res.json({
      status: "success",
      data: features,
    });
  });
};
