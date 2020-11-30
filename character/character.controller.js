// character.controller.js

const User = require("../auth/auth.model");
const Character = require("./character.model");
const errorMessages = require("../utilities/errorMessages");
const newCharacterValidation = require("../validation/new.character.validation")
  .newCharacterValidation;

exports.index = function (req, res) {
  Character.get(function (err, character) {
    if (err) errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: character,
    });
  });
};

exports.new = function (req, res) {
  if (newCharacterValidation(req, res) == null) {
    User.findOne({ token: req.body.token }, function (err, user) {
      if (err) errorMessages.databaseError(res, err);
      if (user) {
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
          if (err) errorMessages.databaseError(res, err);
          res.json({
            status: "success",
            data: newCharacter,
          });
        });
      } else errorMessages.invalidToken(res);
    });
  }
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
  Character.findOne(
    { owner: req.params.owner_name },
    function (err, character) {
      if (err) errorMessages.databaseError(res, err);
      res.json({
        status: "success",
        data: character,
      });
    }
  );
};

// I swear I wanted to but I don't know (YET) how to divide this in smaller functions as they are async (or kind of)

exports.delete = function (req, res) {
  if (req.body.token != null) {
    User.findOne({ token: req.body.token }, function (err, user) {
      if (err) errorMessages.databaseError(res, err);
      if (user == null) {
        errorMessages.invalidToken(res);
      } else {
        if (user.authorization >= 1) {
          Character.findById(
            req.params.character_id,
            function (err, character) {
              if (err) errorMessages.databaseError(res, err);
              if (character == null) {
                errorMessages.characterDoesNotExist(res);
              } else {
                if (character.owner == user.username) {
                  Character.deleteOne(
                    { _id: req.params.character_id },
                    function (err) {
                      if (err) errorMessages.databaseError(res, err);
                      res.json({
                        status: "success",
                        data: "Character deleted",
                      });
                    }
                  );
                } else errorMessages.wrongOwnership(res);
              }
            }
          );
        } else errorMessages.wrongAuthority(res);
      }
    });
  } else errorMessages.wrongRequest(res);
};
