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
    if (err) errorMessages.databaseError(res, err);
    res.json({
      status: "success",
      data: character,
    });
  });
};

function newCharacterValidation (req, res) {
  if (req.body.token && req.body.name && req.body.subname && req.body.oProficiencies && req.body.languages &&
    req.body.alignment && req.body.background && req.body.characterInfo && req.body.race && req.body.class &&
    req.body.level && req.body.stats && req.body.skills && req.body.abilities && req.body.inventory) {
    try{
      var background = JSON.parse(req.body.background);
      var backgroundCorrect = (background.name != null && background.url != null) ? true : false;

      var characterInfo = JSON.parse(req.body.characterInfo);
      var characterInfoCorrect = (characterInfo.personalityTraits != null && characterInfo.ideals != null && characterInfo.bonds != null &&
        characterInfo.flaws != null && characterInfo.story != null && characterInfo.skin != null && characterInfo.hair != null &&
        characterInfo.appeareance != null && characterInfo.age != null && characterInfo.weight != null && characterInfo.height != null) ? true : false;

      var race = JSON.parse(req.body.race);
      var raceCorrect = (race.name != null && race.url != null) ? true : false;

      var level = JSON.parse(req.body.level);
      var levelCorrect = ( level.level != null && level.px != null && level.pxNextLevel != null) ? true : false;

      var stats = JSON.parse(req.body.stats);
      var statsCorrect = (stats.hp != null && stats.ac != null && stats.initiative != null && stats.speed != null &&
        stats.hp.current != null && stats.hp.max != null && stats.characteristics != null &&
        stats.characteristics.salvationThrowsProficiency != null &&
        stats.characteristics.salvationThrowsProficiency.strength != null &&
        stats.characteristics.salvationThrowsProficiency.dexterity != null &&
        stats.characteristics.salvationThrowsProficiency.constitution != null &&
        stats.characteristics.salvationThrowsProficiency.wisdom != null &&
        stats.characteristics.salvationThrowsProficiency.charisma != null &&
        stats.characteristics.strength != null && stats.characteristics.dexterity != null &&
        stats.characteristics.constitution != null && stats.characteristics.inteligence != null &&
        stats.characteristics.wisdom != null && stats.characteristics.charisma != null) ? true : false;

      var skills = JSON.parse(req.body.skills);
      var skillsCorrect = (skills.proficiencies != null && skills.acrobatics != null && skills.animalHandling != null && skills.arcana != null && skills.athletics != null &&
        skills.deception != null && skills.history != null && skills.insight != null && skills.intimidation != null && skills.investigation != null && skills.medicine != null &&
        skills.nature != null && skills.perception != null && skills.performance != null && skills.persuasion != null && skills.religion != null && skills.sleightofhand != null &&
        skills.proficiencies.stealth != null && skills.proficiencies.survival != null &&
        skills.proficiencies.acrobatics != null && skills.proficiencies.animalHandling != null && skills.proficiencies.arcana != null &&
        skills.proficiencies.athletics != null && skills.proficiencies.deception != null && skills.proficiencies.history != null &&
        skills.proficiencies.insight != null && skills.proficiencies.intimidation != null && skills.proficiencies.investigation != null &&
        skills.proficiencies.medicine != null && skills.proficiencies.nature != null && skills.proficiencies.perception != null &&
        skills.proficiencies.performance != null && skills.proficiencies.persuasion != null && skills.proficiencies.religion != null &&
        skills.proficiencies.sleightofhand != null && skills.proficiencies.stealth != null && skills.proficiencies.survival != null) ? true : false;

      var inventory = JSON.parse(req.body.inventory);
      var inventoryCorrect = (inventory.coins != null && inventory.coins.copper != null && inventory.coins.silver != null && inventory.coins.electrum != null &&
        inventory.coins.gold != null && inventory.coins.platinum != null && inventory.items != null) ? true : false;

      var classes = JSON.parse(req.body.class);
      var abilities = JSON.parse(req.body.abilities);
    } catch (e) {
      res.json({
        status: "error",
        data: "JSON syntax error",
      });
      return false;
    }
    if (backgroundCorrect && characterInfoCorrect && raceCorrect && levelCorrect && statsCorrect && skillsCorrect && inventoryCorrect) {
        for (let i = 0; classes.length > i; i++) {
          if (!classes[i].name && !classes[i].url)
            return false;
        }
        for (let i = 0; abilities.feats.length > i; i++) {
          if (!abilities.feats[i].name && !abilities.feats[i].url)
            return false;
        }
        for (let i = 0; abilities.raceAbilities.length > i; i++) {
          if (!abilities.raceAbilities[i].name && !abilities.raceAbilities[i].url)
            return false;
        }
        for (let i = 0; abilities.classAbilities.length > i; i++) {
          if (!abilities.classAbilities[i].name && !abilities.classAbilities[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.cantrips.length > i; i++){
          if(!abilities.spells.cantrips[i].name && !abilities.spells.cantrips[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level2.length > i; i++){
          if(!abilities.spells.level2[i].name && !abilities.spells.level2[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level3.length > i; i++){
          if(!abilities.spells.level3[i].name && !abilities.spells.level3[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level4.length > i; i++){
          if(!abilities.spells.level4[i].name && !abilities.spells.level4[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level5.length > i; i++){
          if(!abilities.spells.level5[i].name && !abilities.spells.level5[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level6.length > i; i++){
          if(!abilities.spells.level6[i].name && !abilities.spells.level6[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level7.length > i; i++){
          if(!abilities.spells.level7[i].name && !abilities.spells.level7[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level8.length > i; i++){
          if(!abilities.spells.level8[i].name && !abilities.spells.level8[i].url)
            return false;
        }
        for (let i = 0; abilities.spells.level9.length > i; i++){
          if(!abilities.spells.level9[i].name && !abilities.spells.level9[i].url)
            return false;
        }
        return true;
    } else return false;
  } else return false;
}
exports.new = function (req, res) {
  if (newCharacterValidation(req, res)) {
    User.findOne({token: req.body.token}, function(err, user){
      if (err) errorMessages.databaseError();
      if (user == null)
        return null;
      var newCharacter = new Character();
      newCharacter.name = req.body.name;
      newCharacter.subname = req.body.subname;
      newCharacter.owner = user.username;
      newCharacter.photo = (req.body.photo) ? req.body.photo : "";
      newCharacter.otherProficiencies = req.body.oProficiencies;
      newCharacter.languages = req.body.languages;
      newCharacter.alignment = req.body.alignment;
      newCharacter.background = JSON.parse(req.body.background);
      newCharacter.characterInfo = JSON.parse(req.body.characterInfo);
      newCharacter.race = JSON.parse(req.body.race);
      newCharacter.class = JSON.parse(req.body.class);
      newCharacter.level = JSON.parse(req.body.level);
      newCharacter.stats = JSON.parse(req.body.stats);
      newCharacter.skills = JSON.parse(req.body.skills);
      newCharacter.abilities = JSON.parse(req.body.abilities);
      newCharacter.inventory = JSON.parse(req.body.inventory);
      newCharacter.save(function (err) {
        if (err) errorMessages.databaseError(res, err);
        res.json({
          status: "success",
          data: newCharacter,
        });
      });
    });
  } else errorMessages.wrongRequest(res);
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
