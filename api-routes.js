// Filename: api-routes.js

let router = require("express").Router();
var characterController = require("./character/character.controller");
var authController = require("./auth/auth.controller");

router.get("/", function (req, res) {
  res.send("DnDmin API REST API Landing Page");
});

// User logistics
router.route("/user/get-token/:user")
    .get(authController.getToken);
router.route("/user/register/")
    .post(authController.register);
router.route("/user/characters/:owner_name")
    .get(characterController.index);
//.post(characterController.new);

// Index all if not identified by Owner or ID
router.route("/character")
    .get(characterController.index);
//.post(characterController.new);
router
  .route("/character/id")
  .get(characterController.index)
  .post(characterController.new);

// Find by ID
router.route("/character/id/:character_id")
    .get(characterController.viewId);

module.exports = router;
