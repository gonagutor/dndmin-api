const mongoose = require("mongoose");

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

var Features = (module.exports = mongoose.model("features", featuresSchema));

module.exports.get = function (callback, limit) {
  Features.find(callback).limit(limit);
};
