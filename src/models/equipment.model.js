// equipment.model.js

const mongoose = require('mongoose');

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
module.exports = mongoose.model('equipment', equipmentSchema);
const Equipment = module.exports;
module.exports.get = function get(callback, limit) {
  Equipment.find(callback).limit(limit);
};
