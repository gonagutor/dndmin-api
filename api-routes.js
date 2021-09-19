// Filename: api-routes.js

const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('DnDmin API REST API Landing Page');
});

// User logistics
router.route('/user/get-token/').get(authController.getToken);
router.route('/user/register/').post(authController.register);
router
  .route('/user/characters/:owner_name')
  .get(characterController.viewOwner)
  .post(characterController.new);

// Index all characters if not identified by Owner or ID
router
  .route('/characters')
  .get(characterController.index)
  .post(characterController.new);
router
  .route('/characters/id')
  .get(characterController.index)
  .post(characterController.new);
router
  .route('/characters/owner')
  .get(characterController.index)
  .post(characterController.new);

// Find by ID
router
  .route('/characters/id/:character_id')
  .get(characterController.viewId)
  .delete(characterController.delete);
// Find by Owner
router
  .route('/characters/owner/:owner_name')
  .get(characterController.viewOwner);

//  Index Classes and create a new one
router
  .route('/classes/')
  .get(classesController.index)
  .post(classesController.new);

router
  .route('/classes/:class')
  .get(classesController.find)
  .delete(classesController.delete);

// Index all equipment if levels not specified
router
  .route('/classes/:class/levels')
  .post(classLevelsController.new)
  .get(classLevelsController.indexClass);

router
  .route('/classes/:class/levels/:level')
  .get(classLevelsController.viewLevel)
  .delete(classLevelsController.deleteLevel);

// Index all equipment if index not specified
router
  .route('/equipment/')
  .get(equipmentController.index)
  .post(equipmentController.new);

router
  .route('/equipment/:index')
  .get(equipmentController.view)
  .delete(equipmentController.delete);

// Index all features if index not specified
router
  .route('/features/')
  .get(featuresController.index)
  .post(featuresController.new);

router
  .route('/features/:index')
  .get(featuresController.find)
  .delete(featuresController.delete);
module.exports = router;
