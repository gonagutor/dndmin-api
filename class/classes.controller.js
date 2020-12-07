// classes.controller.js

const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");
const Classes = require("./classes.model");
const { newClassValidation } = require("../validation/new.class.validation");
const { checkDuplicateByIndex } = require("../utilities/checkDuplicate");

exports.index = function (req, res) {
  Classes.get(function (err, classes) {
    if (err) return errorMessages.databaseError(err);
    var classesList = [];
    for (var i = 0; i < classes.length; i++) {
      var obj = new Object();
      obj.index = classes[i].index;
      obj.class = classes[i].class;
      obj.url = "/classes/" + classes[i].class;
      classesList.push(obj);
    }
    res.json({
      status: "success",
      data: classesList,
    });
  });
};

exports.delete = function (req, res) {
  auth(req, res, 3, function (req, res) {
    Classes.findOneAndDelete(
      { index: req.params.class },
      function (err, classes) {
        if (err) return errorMessages.databaseError(res, err);
        if (!classes) return errorMessages.doesNotExist(res, "class");
        res.json({
          status: "success",
          data: "Class deleted successfully",
        });
      }
    );
  });
};

exports.find = function (req, res) {
  Classes.findOne({ index: req.params.class }, function (err, classes) {
    if (err) return errorMessages.databaseError(res, err);
    if (!classes) return errorMessages.doesNotExist(res, "class");
    res.json({
      status: "success",
      data: classes,
    });
  });
};

exports.new = function (req, res) {
  auth(req, res, 3, function (req, res, user) {
    // TODO: Add the url to each redirect by using the index
    if (newClassValidation(req, res)) return;
    checkDuplicateByIndex(
      req,
      res,
      req.body.index,
      Classes,
      function (req, res) {
        var classes = new Classes();
        classes.index = req.body.index;
        classes.class = req.body.class;
        classes.description = req.body.description;
        classes.hitDice = req.body.hitDice;
        classes.proficiencies = req.body.proficiencies;
        classes.startingEquipment = req.body.startingEquipment;
        classes.classLevels = req.body.classLevels;
        classes.subClasses = req.body.subClasses;
        classes.save(function (err) {
          if (err) return errorMessages.databaseError(res, err);
          res.json({
            status: "success",
            data: "Class added successfully",
          });
        });
      }
    );
  });
};
