// equipment.controller.js

const Equipment = require('../models/equipment.model');
const errorMessages = require('../utilities/errorMessages');
const { auth } = require('./auth.controller');
const {
  newEquipmentValidation,
} = require('../validation/new.equipment.validation');
const { checkDuplicateByIndex } = require('../utilities/checkDuplicate');

exports.index = function index(req, res) {
  Equipment.get((err, equipment) => {
    if (err) return errorMessages.databaseError(res, err);
    const eqlist = [];
    for (let i = 0; i < equipment.length; i += 1) {
      const obj = {};
      obj.index = equipment[i].index;
      obj.name = equipment[i].name;
      obj.url = `/equipment/${equipment[i].index}`;
      eqlist.push(obj);
    }
    return res.json({
      status: 'success',
      data: eqlist,
    });
  });
};

exports.delete = function deleteEquipment(reqToRet, resToRet) {
  auth(reqToRet, resToRet, 3, (req, res) => {
    Equipment.findOneAndDelete(
      { index: req.params.index },
      (err, item) => {
        if (err) return errorMessages.databaseError(res, err);
        if (!item) return errorMessages.doesNotExist(res, 'item');
        return res.json({
          status: 'success',
          data: 'Item deleted successfully',
        });
      },
    );
  });
};

exports.view = function view(req, res) {
  Equipment.findOne({ index: req.params.index }, (err, item) => {
    if (err) return errorMessages.databaseError(res, err);
    if (!item) return errorMessages.doesNotExist(res, 'item');
    return res.json({
      status: 'success',
      data: item,
    });
  });
};

exports.new = function newClass(reqToPass, resToPass) {
  auth(reqToPass, resToPass, 3, (reqToRet, resToRet) => {
    if (newEquipmentValidation(reqToRet, resToRet)) return;
    checkDuplicateByIndex(
      reqToRet,
      resToRet,
      reqToRet.body.index,
      Equipment,
      (req, res) => {
        const equipment = new Equipment();
        equipment.index = req.body.index;
        equipment.name = req.body.name;
        equipment.category = req.body.category;
        equipment.type = req.body.type;
        if (req.body.weight) equipment.weight = req.body.weight;
        if (req.body.description) equipment.description = req.body.description;
        if (req.body.cost) equipment.cost = req.body.cost;
        if (req.body.contents) equipment.contents = req.body.contents;
        equipment.save((err) => {
          if (err) return errorMessages.databaseError(res, err);
          return res.json({
            status: 'success',
            data: 'Successfully added new item',
          });
        });
      },
    );
  });
};
