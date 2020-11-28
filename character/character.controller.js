// character.controller.js

var User = require("../auth/auth.model");
var Character = require("../character/character.model");
var errorMessages = require("../utilities/errorMessages");
var Character = require("./character.model");
/* 
  TODO: Implement a validation system for users before creating a character
  var auth = require("../auth/auth.controller");
  var User = require("../auth/auth.model");
*/

exports.index = function (req, res) {
  Character.get(function (err, character) {
    if (err)
      errorMessages.databaseError(err);
    res.json({
      status: "success",
      data: character,
    });
  });
};

exports.new = function (req, res) {
  let character = new Character();
  character.save(function (err) {
    if (err)
      errorMessages.databaseError(err);
    res.json({
      status: "success",
      data: character,
    });
  });
};

exports.viewId = function (req, res) {
  Character.findById(req.params.character_id, function (err, character) {
    if (err)
      errorMessages.databaseError(err);
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
      if (err)
        errorMessages.databaseError(err);
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
      if (err) errorMessages.databaseError(err);
      if (user == null) {
        errorMessages.invalidToken();
      } else {
        if (user.authorization >= 1) {
          Character.findById(
            req.params.character_id,
            function (err, character) {
              if (err) errorMessages.databaseError(err);
              if (character == null) {
                errorMessages.characterDoesNotExist();
              } else {
                if (character.owner == user.username) {
                  Character.deleteOne(
                    { _id: req.params.character_id },
                    function (err) {
                      if (err) errorMessages.databaseError(err);
                      res.json({
                        status: "success",
                        data: "Character deleted",
                      });
                    }
                  );
                } else errorMessages.wrongOwnership();
              }
            }
          );
        } else errorMessages.wrongAuthority();
      }
    });
  } else errorMessages.wrongRequest();
};
