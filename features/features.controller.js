// features.controller.js

const Features = require('./features.model');
const errorMessage = require('../utilities/errorMessages');
const { auth } = require('../auth/auth.controller');

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

exports.new = function newFeature(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (req, res) => {
    const feature = new Features();
  });
};
