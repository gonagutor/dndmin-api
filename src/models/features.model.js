// feature.model.js

const mongoose = require('mongoose');

const featuresSchema = mongoose.Schema({
  index: String,
  class: {
    index: String,
    name: String,
    url: String,
  },
  name: String,
  level: Number,
  prerequisites: [],
  desc: [String],
});

module.exports = mongoose.model('features', featuresSchema);
const Features = module.exports;

module.exports.get = function get(callback, limit) {
  Features.find(callback).limit(limit);
};
