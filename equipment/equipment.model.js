// equipment.model.js

const { string } = require("joi");
const mongoose = require("mongoose");

const equipmentSchema = mongoose.Schema({
  index: String,
  name: String,
  weight: Number,
  description: String,
  category: {
    index: String,
    name: String,
    url: String,
  },
  type: {
    index: String,
    name: String,
    url: String,
  },
  cost: {
    copper: Number,
    silver: Number,
    electrum: Number,
    gold: Number,
    platinum: Number,
  },
  contents: [
    {
      item: {
        index: String,
        name: String,
        url: String,
      },
      quantity: Number,
    },
  ],
});

var Equipment = (module.exports = mongoose.model("equipment", equipmentSchema));
module.exports.get = function (callback, limit) {
  Equipment.find(callback).limit(limit);
};
