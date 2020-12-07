const mongoose = require("mongoose");

const classLevelsSchema = mongoose.Schema({
  level: Number,
  ownerClass: String,
  abilityScoreBonuses: Number,
  profBonus: Number,
  featureChoices: [
    {
      index: String,
      name: String,
      url: String,
    },
  ],
  features: [
    {
      index: String,
      name: String,
      url: String,
    },
  ],
  classSpecific: {
    rageCount: Number,
    rageDamageBonus: Number,
    brutalCriticalDice: Number,
  },
  class: {
    index: String,
    name: String,
    url: String,
  },
});

var ClassLevels = (module.exports = mongoose.model(
  "classLevels",
  classLevelsSchema
));

module.exports.get = function (callback, limit) {
  ClassLevels.find(callback).limit(limit);
};
