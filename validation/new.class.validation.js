const Joi = require("joi");

/**
 * This function takes a req, and a res and validates the input json
 * of the request body.
 * Prints an error as Json if the request is invalid.
 *
 * @param {*} req Express.js request variable
 * @param {*} res Express.js response variable
 */

exports.newClassValidation = function (req, res) {
  const redirect = Joi.object().keys({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    url: Joi.string(),
  });

  const items = Joi.object().keys({
    equipment: Joi.object()
      .keys({
        index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
        name: Joi.string().required(),
        type: Joi.string().allow("item", "other").required(),
        url: Joi.string(),
      })
      .required(),
    quantity: Joi.number().min(1).required(),
  });

  const proficiencies = Joi.object().keys({
    options: Joi.object()
      .keys({
        amount: Joi.number().min(1).required(),
        from: Joi.array().items(redirect).required(),
      })
      .required(),
    items: Joi.array().items(redirect).required(),
    savingThrows: Joi.array().items(redirect).required(),
  });

  const startingEquipment = Joi.object().keys({
    mandatory: Joi.array().items(items).required(),
    options: Joi.array()
      .items({
        choose: Joi.number().min(1).required(),
        from: Joi.array().items(items).required(),
      })
      .required(),
  });

  const classLevels = Joi.object().keys({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    url: Joi.string(),
  });

  const subClasses = Joi.object().keys({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    url: Joi.string(),
  });

  const base = Joi.object({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    class: Joi.string().required(),
    description: Joi.string().required(),
    hitDice: Joi.number().required(),
    proficiencies: proficiencies.required(),
    startingEquipment: startingEquipment.required(),
    classLevels: classLevels.required(),
    subClasses: Joi.array().items(subClasses).required(),
  });

  const { error } = base.validate(req.body);
  if (error)
    res.json({
      status: "error",
      data: error,
    });
  return error;
};
