// character.controller.js

var Character = require("./character.model");
/* 
  TODO: Implement a validation system for users before creating a character
  var auth = require("../auth/auth.controller");
  var User = require("../auth/auth.model");
*/

exports.index = function (req, res) {
  Character.get(function (err, character) {
    if (err)
      res.json({
        status: "error",
        data: err,
      });
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
      res.json({
        status: "success",
        data: character,
      });
    res.json({
      status: "success",
      data: character,
    });
  });
};

exports.viewId = function (req, res) {
  Character.findById(req.params.character_id, function (err, character) {
    if (err)
      res.json({
        status: "error",
        data: err,
      });
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
        res.json({
          status: "error",
          data: err,
        });
      res.json({
        status: "success",
        data: character,
      });
    }
  );
};

exports.delete = function (req, res) {
  Character.deleteOne({ _id: req.params.character_id }, function (err) {
    if (err)
      res.json({
        status: "error",
        data: err,
      });
    res.json({
      status: "success",
      data: "Character deleted",
    });
  });
};
