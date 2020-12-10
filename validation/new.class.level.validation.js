// new.class.level.validation.js

const Joi = require('joi');

/**
 * This function takes a req, and a res and validates the input json
 * of the request body.
 * Prints an error as Json if the request is invalid.
 *
 * @param {*} req Express.js request variable
 * @param {*} res Express.js response variable
 */

exports.newClassLevelValidation = function newClassLevelValidation(req, res) {
  const redirect = Joi.object().keys({
    index: Joi.string().regex(RegExp('^([a-z0-9-])+$')).required(),
    name: Joi.string().required(),
    url: Joi.string(),
  });
  const base = Joi.object({
    level: Joi.number().min(1).required(),
    abilityScoreBonuses: Joi.number().required().default(0),
    profBonus: Joi.number().default(2),
    featureChoices: Joi.array().items(redirect).required(),
    features: Joi.array().items(redirect).required(),
    classSpecific: Joi.object(),
    class: redirect.required(),
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
