const express = require('express');
const { enhancePromptController } = require('../controllers/enhancePropmptController');
const {defaultController} = require('../controllers/defaultController');
const {extractInfoController} = require('../controllers/etractInfoController')
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  } = require("../controllers/userController");

const router = express.Router();

router.get('/',defaultController); // this is default one
router.post('/enhancePrompt', enhancePromptController);
router.post('/upload-and-chat',extractInfoController);
router.route("/user").get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
