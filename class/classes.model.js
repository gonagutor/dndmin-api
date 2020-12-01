// class.model.js

var mongoose = require("mongoose");
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
        equipment: {
          index: String,
          type: String,
          name: String,
          url: String,
        },
        quantity: Number,
      },
    ],
    options: [
      {
        choose: Number,
        from: [
          {
            equipment: {
              index: String,
              type: String,
              name: String,
              url: String,
            },
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
  subclasses: [
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
