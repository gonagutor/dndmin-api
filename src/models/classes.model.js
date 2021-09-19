// class.model.js

const mongoose = require('mongoose');

const equipmentSchema = mongoose.Schema({
  index: String,
  type: String,
  name: String,
  url: String,
});
const classesSchema = mongoose.Schema({
  index: String,
  class: String,
  description: String,
  hitDice: Number,
  proficiencies: {
    options: {
      amount: Number,
      from: [
        {
          index: String,
          name: String,
          url: String,
        },
      ],
    },
    items: [
      {
        index: String,
        name: String,
        url: String,
      },
    ],
    savingThrows: [
      {
        index: String,
        name: String,
        url: String,
      },
    ],
  },
  startingEquipment: {
    mandatory: [
      {
        equipment: [equipmentSchema],
        quantity: Number,
      },
    ],
    options: [
      {
        choose: Number,
        from: [
          {
            equipment: [equipmentSchema],
            quantity: Number,
          },
        ],
      },
    ],
  },
  classLevels: {
    index: String,
    name: String,
    url: String,
  },
  subClasses: [
    {
      index: String,
      name: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model('classes', classesSchema);
const Classes = module.exports;
module.exports.get = function get(callback, limit) {
  Classes.find(callback).limit(limit);
};
