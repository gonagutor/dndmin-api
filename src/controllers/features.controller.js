// features.controller.js

const Features = require('../models/features.model');
const errorMessage = require('../utilities/errorMessages');
const { newFeaturesValidation } = require('../validation/new.features.validation');
const { auth } = require('./auth.controller');

exports.index = function index(req, res) {
  Features.get((err, features) => {
    if (err) return errorMessage.databaseError(res, err);
    return res.json({
      status: 'success',
      data: features,
    });
  });
};

exports.find = function find(req, res) {
  Features.find({ index: req.params.index }, (err, features) => {
    if (err) return errorMessage.databaseError(res, err);
    if (!features) return errorMessage.doesNotExist(res, 'Feature');
    return res.json({
      status: 'success',
      data: features,
    });
  });
};

exports.delete = function deleteFeature(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (req, res) => {
    Features.find({ index: req.params.index }, (err, feature) => {
      if (err) return errorMessage.databaseError(res, err);
      if (!feature) return errorMessage.doesNotExist(res, 'feature');
      return res.json({
        status: 'success',
        data: 'Feature deleted succesfully',
      });
    });
  });
};

exports.new = function newFeature(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (req, res) => {
    if (newFeaturesValidation(req, res)) return;
    const feature = new Features();
    feature.index = req.body.index;
    feature.class = req.body.class;
    feature.name = req.body.name;
    feature.level = req.body.level;
    feature.prerequisites = req.body.prerequisites;
    feature.desc = req.body.desc;
    feature.save((err) => {
      if (err) return errorMessage.databaseError(res, err);
      return res.json({
        status: 'success',
        data: 'Successfully added a new feature',
      });
    });
  });
};
