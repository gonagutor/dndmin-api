// new.equipment.validation.js

const Joi = require("joi");

exports.newEquipmentValidation = function (req, res) {
  const category = Joi.object().keys({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
  });

  const type = Joi.object().keys({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
  });

  const cost = Joi.object().keys({
    copper: Joi.number().min(0).required(),
    silver: Joi.number().min(0).required(),
    electrum: Joi.number().min(0).required(),
    gold: Joi.number().min(0).required(),
    platinum: Joi.number().min(0).required(),
  });

  const contentsItem = Joi.object().keys({
    item: type.required(),
    quantity: Joi.number().required(),
  });

  const base = Joi.object({
    index: Joi.string().regex(RegExp("^([a-z0-9-])+$")).required(),
    name: Joi.string().required(),
    weight: Joi.number().min(0),
    description: Joi.string(),
    category: category.required(),
    type: type.required(),
    cost: cost,
    contents: Joi.array().items(contentsItem),
  });

  const { error } = base.validate(req.body);
  if (error)
    res.json({
      status: "error",
      data: error,
    });
  return error;
};
