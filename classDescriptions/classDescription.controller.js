var ClassDescription = require("./classDescription.model");
var errorMessages = require("../utilities/errorMessages");
var { auth  } = require("../auth/auth.controller")

exports.index = function (req, res) {
  ClassDescription.get(function (err, classDescriptions) {
    if (err) errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: classDescriptions,
    });
  });
};

exports.find = function (req, res) {
  ClassDescription.findOne(
    { class: req.params.class_name },
    function (err, classDescription) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: classDescription,
      });
    }
  );
};

exports.delete = function (req, res) {
  auth (req, res, 3, function (req, res, user) {
    ClassDescription.findOneAndDelete({ class: req.params.class_name }, function (err, classDescription) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: "Class description succesfully deleted",
      });
    });
  });
};

exports.new = function (req, res) {
  auth (req, res, 3, function (req, res, user){
    if (!req.body.description && !req.body.class) return errorMessages.wrongRequest();
    let newClassDescription = new ClassDescription();
    newClassDescription.class = req.body.class;
    newClassDescription.description = req.body.description;
    newClassDescription.save(function (err, newClassDescription) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: newClassDescription,
      });
    });
  });
};
