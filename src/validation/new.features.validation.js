// new.features.validation.js

const Joi = require('joi');

exports.newFeaturesValidation = function newEquipmentValidation(req, res) {
  const redirect = Joi.object().keys({
    index: Joi.string().regex(RegExp('^([a-z0-9-])+$')).required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
  });

  const base = Joi.object({
    index: Joi.string().regex(RegExp('^([a-z0-9-])+$')).required(),
    class: redirect.required(),
    name: Joi.string().required(),
    level: Joi.number().min(1).required(),
    prerequisites: Joi.array(),
    desc: Joi.array(Joi.string()),
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
