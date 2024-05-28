const express = require('express');
const { enhancePromptController } = require('../controllers/enhancePropmptController');
const {defaultController} = require('../controllers/defaultController');
const {
  getAllResume,
    createResume,
    getResumeById,
    updateResume,
    deleteResume,
  } = require("../controllers/resumeDetailsController");
const { jobsController, getJobLists } = require('../controllers/jobsController');
const { loginController, signupController } = require('../controllers/authController');
const { googleJobsController } = require('../controllers/googleJobsController');

const router = express.Router();

router.get('/',defaultController); // this is default one
router.get('/jobs',jobsController);
router.get('/listjobsfromdb',getJobLists);
router.post('/enhancePrompt', enhancePromptController);
router.route("/resume").get(getAllResume).post(createResume);
router.route("/resume-list/:id").get(getResumeById).put(updateResume).delete(deleteResume);
router.post("/login",loginController);
router.post("/signup",signupController);
router.post("/gjob",googleJobsController)

module.exports = router;
