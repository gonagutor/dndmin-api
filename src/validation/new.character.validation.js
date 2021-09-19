// new.character.validation.js

const Joi = require('joi');

/**
 * This function takes a req, and a res and validates the input json
 * of the request body.
 * Prints an error as Json if the request is invalid.
 *
 * @param {*} req Express.js request variable
 * @param {*} res Express.js response variable
 */

exports.newCharacterValidation = function newCharacterValidation(req, res) {
  const redirectSchema = Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().required(),
  });
  const characterInfoSchema = Joi.object().keys({
    personalityTraits: Joi.string().required(),
    ideals: Joi.string().required(),
    bonds: Joi.string().required(),
    flaws: Joi.string().required(),
    story: Joi.string().required(),
    skin: Joi.string().required(),
    hair: Joi.string().required(),
    appeareance: Joi.string().required(),
    age: Joi.number().required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
  });
  const raceSchema = Joi.object().keys({
    name: Joi.string().required(),
    url: Joi.string().required(),
  });
  const levelSchema = Joi.object().keys({
    level: Joi.number().required(),
    class: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().required(),
          level: Joi.number().required(),
          url: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
    px: Joi.number().required(),
    pxNextLevel: Joi.number().required(),
  });
  const statsSchema = Joi.object({
    ac: Joi.number().required().min(0),
    initiative: Joi.number().required(),
    speed: Joi.number().min(0).required(),
    hp: Joi.object().keys({
      current: Joi.number().required(),
      max: Joi.number().required(),
      temp: Joi.number().required().min(0),
    }),
    characteristics: Joi.object().keys({
      strength: Joi.number().min(0).required(),
      dexterity: Joi.number().min(0).required(),
      constitution: Joi.number().min(0).required(),
      inteligence: Joi.number().min(0).required(),
      wisdom: Joi.number().min(0).required(),
      charisma: Joi.number().min(0).required(),
      salvationThrowsProficiency: Joi.object({
        strength: Joi.bool().required(),
        dexterity: Joi.bool().required(),
        constitution: Joi.bool().required(),
        inteligence: Joi.bool().required(),
        wisdom: Joi.bool().required(),
        charisma: Joi.bool().required(),
      }),
    }),
  });
  const skillsSchema = Joi.object().keys({
    acrobatics: Joi.number().required(),
    animalHandling: Joi.number().required(),
    arcana: Joi.number().required(),
    athletics: Joi.number().required(),
    deception: Joi.number().required(),
    history: Joi.number().required(),
    insight: Joi.number().required(),
    intimidation: Joi.number().required(),
    investigation: Joi.number().required(),
    medicine: Joi.number().required(),
    nature: Joi.number().required(),
    perception: Joi.number().required(),
    performance: Joi.number().required(),
    persuasion: Joi.number().required(),
    religion: Joi.number().required(),
    sleightofhand: Joi.number().required(),
    stealth: Joi.number().required(),
    survival: Joi.number().required(),
    proficiencies: Joi.object().keys({
      acrobatics: Joi.bool().required(),
      animalHandling: Joi.bool().required(),
      arcana: Joi.bool().required(),
      athletics: Joi.bool().required(),
      deception: Joi.bool().required(),
      history: Joi.bool().required(),
      insight: Joi.bool().required(),
      intimidation: Joi.bool().required(),
      investigation: Joi.bool().required(),
      medicine: Joi.bool().required(),
      nature: Joi.bool().required(),
      perception: Joi.bool().required(),
      performance: Joi.bool().required(),
      persuasion: Joi.bool().required(),
      religion: Joi.bool().required(),
      sleightofhand: Joi.bool().required(),
      stealth: Joi.bool().required(),
      survival: Joi.bool().required(),
    }),
  });
  const abilitiesSchema = Joi.object().keys({
    feats: Joi.array().items(redirectSchema).required(),
    raceAbilities: Joi.array().items(redirectSchema).required(),
    classAbilities: Joi.array().items(redirectSchema).required(),
    spells: Joi.object()
      .keys({
        cantrips: Joi.array().items(redirectSchema),
        level1: Joi.array().items(redirectSchema),
        level2: Joi.array().items(redirectSchema),
        level3: Joi.array().items(redirectSchema),
        level4: Joi.array().items(redirectSchema),
        level5: Joi.array().items(redirectSchema),
        level6: Joi.array().items(redirectSchema),
        level7: Joi.array().items(redirectSchema),
        level8: Joi.array().items(redirectSchema),
        level9: Joi.array().items(redirectSchema),
      })
      .required(),
  });
  const inventorySchema = Joi.object().keys({
    coins: Joi.object()
      .keys({
        copper: Joi.number().required(),
        silver: Joi.number().required(),
        electrum: Joi.number().required(),
        gold: Joi.number().required(),
        platinum: Joi.number().required(),
      })
      .required(),
    items: Joi.array()
      .items(
        Joi.object().keys({
          name: Joi.string().required(),
          amount: Joi.number().required(),
          url: Joi.string().required(),
        }),
      )
      .required(),
  });
  const base = Joi.object({
    name: Joi.string().required().max(16).min(3),
    subname: Joi.string(),
    photo: Joi.string(),
    otherProficiencies: Joi.string(),
    languages: Joi.string(),
    alignment: Joi.string(),
    background: redirectSchema.required(),
    characterInfo: characterInfoSchema.required(),
    race: raceSchema.required(),
    level: levelSchema.required(),
    stats: statsSchema.required(),
    skills: skillsSchema.required(),
    abilities: abilitiesSchema.required(),
    inventory: inventorySchema.required(),
  });
  const { error } = base.validate(req.body);
  if (error) {
    res.json({
      status: 'error',
      data: error,
    });
  }
  return error;
};
