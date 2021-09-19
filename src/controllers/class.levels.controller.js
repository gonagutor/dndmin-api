// class.levels.controller.js

const ClassLevels = require('../models/class.levels.model');
const errorMessages = require('../utilities/errorMessages');
const { auth } = require('./auth.controller');
const {
  newClassLevelValidation,
} = require('../validation/new.class.level.validation');

exports.indexClass = function indexClass(req, res) {
  ClassLevels.find(
    { ownerClass: req.params.class },
    (err, classLevels) => {
      if (err) return errorMessages.databaseError(res, err);
      if (!classLevels || classLevels.length === 0) return errorMessages.doesNotExist(res, 'Class');
      return res.json({ status: 'success', data: classLevels });
    },
  );
};

exports.viewLevel = function viewLevel(req, res) {
  ClassLevels.findOne(
    { level: req.params.level, ownerClass: req.params.class },
    (err, classLevel) => {
      if (err) return errorMessages.databaseError(res, err);
      if (!classLevel) return errorMessages.doesNotExist(res, 'Class or Level');
      return res.json({ status: 'success', data: classLevel });
    },
  );
};

exports.new = function newClassLevel(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (req, res) => {
    if (newClassLevelValidation(req, res)) return;
    const classLevel = new ClassLevels();
    classLevel.level = req.body.level;
    classLevel.ownerClass = req.params.class;
    classLevel.abilityScoreBonuses = req.body.abilityScoreBonuses;
    classLevel.profBonus = req.body.profBonus;
    classLevel.featureChoices = req.body.featureChoices;
    classLevel.features = req.body.features;
    classLevel.classSpecific = req.body.classSpecific;
    classLevel.class = req.body.class;
    classLevel.save((err) => {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: 'success',
        data: `Successfully added a new level to ${req.params.class}`,
      });
    });
  });
};

exports.deleteLevel = function deleteLevel(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (req, res) => {
    ClassLevels.findOneAndDelete(
      { level: req.params.level, ownerClass: req.params.class },
      (err, classLevel) => {
        if (err) return errorMessages.databaseError(res, err);
        if (!classLevel) return errorMessages.doesNotExist(res, 'Class or Level');
        return res.json({
          status: 'success',
          data: 'Class level deleted successfully',
        });
      },
    );
  });
};
