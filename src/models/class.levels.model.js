// class.levels.model.js

const mongoose = require('mongoose');

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
  classSpecific: mongoose.Schema.Types.Mixed,
  class: {
    index: String,
    name: String,
    url: String,
  },
});

module.exports = mongoose.model('classLevels', classLevelsSchema);
const ClassLevels = module.exports;

module.exports = function get(callback, limit) {
  ClassLevels.find(callback).limit(limit);
};
