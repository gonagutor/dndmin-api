// classes.controller.js

const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");
const Classes = require("./classes.model");
const { newClassValidation } = require("../validation/new.class.validation");

exports.index = function (res, req) {
  Classes.get(function (err, classes) {
    if (err) errorMessages.databaseError(err);
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
    Classes.findOneAndDelete({ index: req.params.class }, function (err) {
      if (!classes) return errorMessages.doesNotExist(res, "class");
      res.json({
        status: "success",
        data: "Class deleted successfully",
      });
    });
  });
};

exports.find = function (req, res) {
  Classes.findOne({ index: req.params.class }, function (err, classes) {
    if (!classes) return errorMessages.doesNotExist(res, "class");
    res.json({
      status: "success",
      data: classes,
    });
  });
};

exports.new = function (req, res) {
  auth(req, res, 3, function (res, req) {
    // TODO: Add the url to each redirect by using the index
    if (newClassValidation(req, res)) return;
    var classes = new Classes();
    classes.index = res.body.index;
    classes.class = res.body.class;
    classes.description = res.body.description;
    classes.hitDice = res.body.hitDice;
    classes.proficiencies = res.body.proficiencies;
    classes.startingEquipment = res.body.startingEquipment;
    classes.classLevels = res.body.classLevels;
    classes.subClasses = res.body.subClasses;
    classes.save(err, function (err) {
      if (err) errorMessages.databaseError(res, err);
    });
  });
};
