// Filename: api-routes.js

let router = require("express").Router();
var characterController = require("./character/character.controller");
var authController = require("./auth/auth.controller");
var classDescriptionController = require("./classDescriptions/classDescription.controller");

router.get("/", function (req, res) {
  res.send("DnDmin API REST API Landing Page");
});

// User logistics
router.route("/user/get-token/").get(authController.getToken);
router.route("/user/register/").post(authController.register);
router
  .route("/user/characters/:owner_name")
  .get(characterController.viewOwner)
  .post(characterController.new);

// Index all characters if not identified by Owner or ID
router
  .route("/characters")
  .get(characterController.index)
  .post(characterController.new);
router
  .route("/characters/id")
  .get(characterController.index)
  .post(characterController.new);
router
  .route("/characters/owner")
  .get(characterController.index)
  .post(characterController.new);

// Find by ID
router
  .route("/characters/id/:character_id")
  .get(characterController.viewId)
  .delete(characterController.delete);
// Find by Owner
router
  .route("/characters/owner/:owner_name")
  .get(characterController.viewOwner);

// Index all class helpers if not identified by class
router
  .route("/helpers/class/")
  .get(classDescriptionController.index)
  .post(classDescriptionController.new);

// Find by class
router
  .route("/helpers/class/:class_name")
  .get(classDescriptionController.find)
  .delete(classDescriptionController.delete);

module.exports = router;
