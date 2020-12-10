// character.controller.js

const Character = require('./character.model');
const errorMessages = require('../utilities/errorMessages');
const { auth } = require('../auth/auth.controller');
const { newCharacterValidation } = require('../validation/new.character.validation');

/* eslint no-underscore-dangle: 0 */
exports.index = function index(req, res) {
  Character.get((err, character) => {
    if (err) errorMessages.databaseError(res, err);
    const charlist = [];
    for (let i = 0; i < character.length; i += 1) {
      const obj = {};
      obj.id = character[i]._id;
      obj.owner = character[i].owner;
      obj.name = character[i].name;
      obj.url = `/characters/id/${character[i]._id}`;
      charlist.push(obj);
    }
    res.json({
      status: 'success',
      data: charlist,
    });
  });
};

exports.new = function newCharacterF(req1, res1) {
  auth(req1, res1, 1, (req, res, user) => {
    if (newCharacterValidation(req, res)) { return errorMessages.invalidToken(res); }
    const newCharacter = new Character();
    newCharacter.name = req.body.name;
    newCharacter.subname = req.body.subname;
    newCharacter.owner = user.username;
    newCharacter.photo = req.body.photo ? req.body.photo : '';
    newCharacter.otherProficiencies = req.body.otherProficiencies;
    newCharacter.languages = req.body.languages;
    newCharacter.alignment = req.body.alignment;
    newCharacter.background = req.body.background;
    newCharacter.characterInfo = req.body.characterInfo;
    newCharacter.race = req.body.race;
    newCharacter.level = req.body.level;
    newCharacter.stats = req.body.stats;
    newCharacter.skills = req.body.skills;
    newCharacter.abilities = req.body.abilities;
    newCharacter.inventory = req.body.inventory;
    return newCharacter.save((err) => {
      if (err) return errorMessages.databaseError(res, err);
      return res.json({
        status: 'success',
        data: newCharacter,
      });
    });
  });
};

exports.viewId = function viewId(req, res) {
  Character.findById(req.params.character_id, (err, character) => {
    if (err) return errorMessages.databaseError(res, err);
    if (!character) return errorMessages.doesNotExist(res, 'character');
    return res.json({
      status: 'success',
      data: character,
    });
  });
};

exports.viewOwner = function viewOwner(req, res) {
  Character.find({ owner: req.params.owner_name }, (err, character) => {
    if (err) return errorMessages.databaseError(res, err);
    if (!character) return errorMessages.databaseError(res, 'user');
    const charlist = [];
    for (let i = 0; i < character.length; i += 1) {
      const obj = {};
      obj.id = character[i]._id;
      obj.owner = character[i].owner;
      obj.name = character[i].name;
      obj.url = `/characters/id/${character[i]._id}`;
      charlist.push(obj);
    }
    return res.json({
      status: 'success',
      data: charlist,
    });
  });
};

exports.delete = function deleteCharacter(req1, res1) {
  auth(req1, res1, 1, (req, res, user) => {
    Character.findById(req.params.character_id, (err1, character) => {
      if (err1) return errorMessages.databaseError(res, err1);
      if (!character) return errorMessages.doesNotExist(res, 'character');
      if (character.owner !== user.username) { return errorMessages.wrongOwnership(res); }
      return Character.deleteOne({ _id: req.params.character_id }, (err2) => {
        if (err2) return errorMessages.databaseError(res, err2);
        return res.json({
          status: 'success',
          data: 'Character deleted',
        });
      });
    });
  });
};
