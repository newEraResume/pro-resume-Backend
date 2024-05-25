const express = require('express');
const { enhancePromptController } = require('../controllers/enhancePropmptController');
const {defaultController} = require('../controllers/defaultController');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  } = require("../controllers/userController");
const { jobsController, getJobLists } = require('../controllers/jobsController');

const router = express.Router();

router.get('/',defaultController); // this is default one
router.get('/jobs',jobsController);
router.get('/listjobsfromdb',getJobLists);
router.post('/enhancePrompt', enhancePromptController);
router.route("/user").get(getAllUsers).post(createUser);
router.route("/user/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
