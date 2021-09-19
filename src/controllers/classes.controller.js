// classes.controller.js

const errorMessages = require('../utilities/errorMessages');
const Classes = require('../models/classes.model');
const { auth } = require('./auth.controller');
const { newClassValidation } = require('../validation/new.class.validation');
const { checkDuplicateByIndex } = require('../utilities/checkDuplicate');

exports.index = function index(req, res) {
  Classes.get((err, classes) => {
    if (err) return errorMessages.databaseError(err);
    const classesList = [];
    for (let i = 0; i < classes.length; i += 1) {
      const obj = {};
      obj.index = classes[i].index;
      obj.class = classes[i].class;
      obj.url = `/classes/${classes[i].class}`;
      classesList.push(obj);
    }
    return res.json({
      status: 'success',
      data: classesList,
    });
  });
};

exports.delete = function deleteClass(reqToRet, resToRet) {
  auth(reqToRet, resToRet, 3, (req, res) => {
    Classes.findOneAndDelete(
      { index: req.params.class },
      (err, classes) => {
        if (err) return errorMessages.databaseError(res, err);
        if (!classes) return errorMessages.doesNotExist(res, 'class');
        return res.json({
          status: 'success',
          data: 'Class deleted successfully',
        });
      },
    );
  });
};

exports.find = function find(req, res) {
  Classes.findOne({ index: req.params.class }, (err, classes) => {
    if (err) return errorMessages.databaseError(res, err);
    if (!classes) return errorMessages.doesNotExist(res, 'class');
    return res.json({
      status: 'success',
      data: classes,
    });
  });
};

exports.new = function newClass(reqToRet, resToRet) {
  auth(reqToRet, resToRet, 3, (reqToPass, resToPass) => {
    // TODO: Add the url to each redirect by using the index
    if (newClassValidation(reqToPass, resToPass)) return;
    checkDuplicateByIndex(
      reqToPass,
      resToPass,
      reqToPass.body.index,
      Classes,
      (req, res) => {
        const classes = new Classes();
        classes.index = req.body.index;
        classes.class = req.body.class;
        classes.description = req.body.description;
        classes.hitDice = req.body.hitDice;
        classes.proficiencies = req.body.proficiencies;
        classes.startingEquipment = req.body.startingEquipment;
        classes.classLevels = req.body.classLevels;
        classes.subClasses = req.body.subClasses;
        classes.save((err) => {
          if (err) return errorMessages.databaseError(res, err);
          return res.json({
            status: 'success',
            data: 'Class added successfully',
          });
        });
      },
    );
  });
};
