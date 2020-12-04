// equipment.controller.js

const Equipment = require("./equipment.model");
const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");

exports.index = function (req, res) {
  Equipment.get(function (err, equipment) {
    if (err) errorMessages.databaseError(res, err);
    var eqlist = [];
    for (var i = 0; i < equipment.length; i++) {
      var obj = new Object();
      obj.index = equipment[i].index;
      obj.name = equipment[i].name;
      obj.url = "/equipment/" + equipment[i].url;
      eqlist.push(obj);
    }
    res.json({
      status: "success",
      data: eqlist,
    });
  });
};

exports.delete = function (req, res) {
  auth(req, res, 3, function (req, res, user) {
    Equipment.findOneAndDelete(
      { index: req.params.index },
      function (err, item) {
        if (err) return errorMessages.databaseError(res, err);
        if (!item) return errorMessages.doesNotExist(res, "item");
        res.json({
          status: "success",
          data: "Item deleted successfully",
        });
      }
    );
  });
};

exports.view = function (req, res) {
  Equipment.findOne({ index: req.params.index }, function (err, item) {
    if (err) return errorMessages.databaseError(res, err);
    if (!item) return errorMessages.doesNotExist(res, "item");
    res.json({
      status: "success",
      data: equipment,
    });
  });
};
