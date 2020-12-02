// class.model.js

var mongoose = require("mongoose");
var equipmentSchema = mongoose.Schema({
  index: String,
  type: String,
  name: String,
  url: String,
});
var classesSchema = mongoose.Schema({
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

var Classes = (module.exports = mongoose.model("classes", classesSchema));
module.exports.get = function (callback, limit) {
  Classes.find(callback).limit(limit);
};
