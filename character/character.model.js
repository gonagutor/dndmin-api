// character.model.js

var mongoose = require("mongoose");
const aIncrement = require("mongoose-sequence")(mongoose);
var characterSchema = mongoose.Schema(
  {
    _id: Number,
    name: String,
    subname: String,
    owner: String,
    photo: String,
    otherProficiencies: String,
    languages: String,
    alignment: String,
    background: {
      name: String,
      url: String,
    },
    characterInfo: {
      personalityTraits: String,
      ideals: String,
      bonds: String,
      flaws: String,
      story: String,
      skin: String,
      hair: String,
      appearance: String,
      age: Number,
      weight: Number,
      height: Number,
    },
    race: {
      name: String,
      url: String,
    },
    class: [
      {
        name: String,
        url: String,
      },
    ],
    level: {
      level: Number,
      px: Number,
      pxNextLevel: Number,
    },
    stats: {
      ac: Number,
      initiative: Number,
      speed: Number,
      hp: {
        current: Number,
        max: Number,
        temp: Number,
      },
      characteristics: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        inteligence: Number,
        wisdom: Number,
        charisma: Number,
        salvationThrowsProficiency: {
          strength: Boolean,
          dexterity: Boolean,
          constitution: Boolean,
          inteligence: Boolean,
          wisdom: Boolean,
          charisma: Boolean,
        },
      },
    },
    skills: {
      acrobatics: Number,
      animalHandling: Number,
      arcana: Number,
      athletics: Number,
      deception: Number,
      history: Number,
      insight: Number,
      intimidation: Number,
      investigation: Number,
      medicine: Number,
      nature: Number,
      perception: Number,
      performance: Number,
      persuasion: Number,
      religion: Number,
      sleightofhand: Number,
      stealth: Number,
      survival: Number,
      proficiencies: {
        acrobatics: Boolean,
        animalHandling: Boolean,
        arcana: Boolean,
        athletics: Boolean,
        deception: Boolean,
        history: Boolean,
        insight: Boolean,
        intimidation: Boolean,
        investigation: Boolean,
        medicine: Boolean,
        nature: Boolean,
        perception: Boolean,
        performance: Boolean,
        persuasion: Boolean,
        religion: Boolean,
        sleightofhand: Boolean,
        stealth: Boolean,
        survival: Boolean,
      },
    },
    abilities: {
      feats: [
        {
          name: String,
          url: String,
        },
      ],
      raceAbilities: [
        {
          name: String,
          url: String,
        },
      ],
      classAbilities: [
        {
          name: String,
          url: String,
        },
      ],
      spells: {
        cantrips: [
          {
            name: String,
            url: String,
          },
        ],
        level1: [
          {
            name: String,
            url: String,
          },
        ],
        level2: [
          {
            name: String,
            url: String,
          },
        ],
        level3: [
          {
            name: String,
            url: String,
          },
        ],
        level4: [
          {
            name: String,
            url: String,
          },
        ],
        level5: [
          {
            name: String,
            url: String,
          },
        ],
        level6: [
          {
            name: String,
            url: String,
          },
        ],
        level7: [
          {
            name: String,
            url: String,
          },
        ],
        level8: [
          {
            name: String,
            url: String,
          },
        ],
        level9: [
          {
            name: String,
            url: String,
          },
        ],
      },
    },
    inventory: {
      coins: {
        copper: Number,
        silver: Number,
        electrum: Number,
        gold: Number,
        platinum: Number,
      },
      items: [
        {
          name: String,
          amount: Number,
          url: String,
        },
      ],
    },
  },
  { _id: false }
);
characterSchema.plugin(aIncrement);
var Character = (module.exports = mongoose.model("character", characterSchema));
module.exports.get = function (callback, limit) {
  Character.find(callback).limit(limit);
};
