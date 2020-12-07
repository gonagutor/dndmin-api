const ClassLevels = require("./class.levels.model");
const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");

exports.indexClass = function (req, res) {
  ClassLevels.find(
    { ownerClass: req.params.class },
    function (err, classLevels) {
      if (err) return errorMessages.databaseError(res, err);
      if (!classLevels || classLevels.length == 0)
        return errorMessages.doesNotExist(res, "Class");
      res.json({ status: "success", data: classLevels });
    }
  );
};

exports.viewLevel = function (req, res) {
  ClassLevels.findOne(
    { level: req.params.level, ownerClass: req.params.class },
    function (err, classLevel) {
      if (err) return errorMessages.databaseError(res, err);
      if (!classLevel) return errorMessages.doesNotExist(res, "Class or Level");
      res.json({ status: "success", data: classLevel });
    }
  );
};

exports.deleteLevel = function (req, res) {
  auth(req, res, 3, function (req, res, user) {
    ClassLevels.findOneAndDelete(
      { level: req.params.level, ownerClass: req.params.class },
      function (err, classLevel) {
        if (err) return errorMessages.databaseError(res, err);
        if (!classLevel)
          return errorMessages.doesNotExist(res, "Class or Level");
        res.json({
          status: "success",
          data: "Class level deleted successfully",
        });
      }
    );
  });
};
