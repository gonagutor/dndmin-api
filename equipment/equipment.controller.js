// equipment.controller.js

const Equipment = require("./equipment.model");
const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");
const {
  newEquipmentValidation,
} = require("../validation/new.equipment.validation");
const { checkDuplicateByIndex } = require("../utilities/checkDuplicate");

exports.index = function (req, res) {
  Equipment.get(function (err, equipment) {
    if (err) return errorMessages.databaseError(res, err);
    var eqlist = [];
    for (var i = 0; i < equipment.length; i++) {
      var obj = new Object();
      obj.index = equipment[i].index;
      obj.name = equipment[i].name;
      obj.url = "/equipment/" + equipment[i].index;
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
      data: item,
    });
  });
};

exports.new = function (req, res) {
  auth(req, res, 3, function (req, res, user) {
    if (newEquipmentValidation(req, res)) return;
    checkDuplicateByIndex(
      req,
      res,
      req.body.index,
      Equipment,
      function (req, res) {
        var equipment = new Equipment();
        equipment.index = req.body.index;
        equipment.name = req.body.name;
        equipment.category = req.body.category;
        equipment.type = req.body.type;
        if (req.body.weight) equipment.weight = req.body.weight;
        if (req.body.description) equipment.description = req.body.description;
        if (req.body.cost) equipment.cost = req.body.cost;
        if (req.body.contents) equipment.contents = req.body.contents;
        equipment.save(function (err) {
          if (err) return errorMessages.databaseError(res, err);
          res.json({
            status: "success",
            data: "Successfully added new item",
          });
        });
      }
    );
  });
};
