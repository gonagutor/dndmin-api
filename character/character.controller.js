// character.controller.js

const Character = require("./character.model");
const errorMessages = require("../utilities/errorMessages");
const { auth } = require("../auth/auth.controller");
const newCharacterValidation = require("../validation/new.character.validation")
  .newCharacterValidation;

exports.index = function (req, res) {
  Character.get(function (err, character) {
    if (err) errorMessages.databaseError(res, err);
    var charlist = [];
    for (var i = 0; i < character.length; i++) {
      var obj = new Object();
      obj.id = character[i]._id;
      obj.owner = character[i].owner;
      obj.name = character[i].name;
      obj.url = "/characters/id/" + character[i]._id;
      charlist.push(obj);
    }
    res.json({
      status: "success",
      data: charlist,
    });
  });
};

exports.new = function (req, res) {
  auth(req, res, 1, function (req, res, user) {
    if (newCharacterValidation(req, res))
      return errorMessages.invalidToken(res);
    var newCharacter = new Character();
    newCharacter.name = req.body.name;
    newCharacter.subname = req.body.subname;
    newCharacter.owner = user.username;
    newCharacter.photo = req.body.photo ? req.body.photo : "";
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
    newCharacter.save(function (err) {
      if (err) return errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: newCharacter,
      });
    });
  });
};

exports.viewId = function (req, res) {
  Character.findById(req.params.character_id, function (err, character) {
    if (err) errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: character,
    });
  });
};

exports.viewOwner = function (req, res) {
  Character.find({ owner: req.params.owner_name }, function (err, character) {
    if (err) errorMessages.databaseError(res, err);
    var charlist = [];
    for (var i = 0; i < character.length; i++) {
      var obj = new Object();
      obj.id = character[i]._id;
      obj.owner = character[i].owner;
      obj.name = character[i].name;
      obj.url = "/characters/id/" + character[i]._id;
      charlist.push(obj);
    }
    res.json({
      status: "success",
      data: charlist,
    });
  });
};

exports.delete = function (req, res) {
  auth(req, res, 1, function (req, res, user) {
    Character.findById(req.params.character_id, function (err, character) {
      if (err) return errorMessages.databaseError(res, err);
      if (!character) return errorMessages.characterDoesNotExist(res);
      if (character.owner != user.username)
        return errorMessages.wrongOwnership(res);
      Character.deleteOne({ _id: req.params.character_id }, function (err) {
        if (err) errorMessages.databaseError(res, err);
        res.json({
          status: "success",
          data: "Character deleted",
        });
      });
    });
  });
};
