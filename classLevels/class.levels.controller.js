const ClassLevels = require("./class.levels.model");
const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");
const {
  newClassLevelValidation,
} = require("../validation/new.class.level.validation");

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

exports.new = function (req, res) {
  auth(req, res, 3, function (req, res, user) {
    if (newClassLevelValidation(req, res)) return;
    var classLevel = new ClassLevels();
    classLevel.level = req.body.level;
    classLevel.ownerClass = req.params.class;
    classLevel.abilityScoreBonuses = req.body.abilityScoreBonuses;
    classLevel.profBonus = req.body.profBonus;
    classLevel.featureChoices = req.body.featureChoices;
    classLevel.features = req.body.features;
    classLevel.classSpecific = req.body.classSpecific;
    classLevel.class = req.body.class;
    classLevel.save(function (err) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: "Successfully added a new level to " + req.params.class,
      });
    });
  });
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
