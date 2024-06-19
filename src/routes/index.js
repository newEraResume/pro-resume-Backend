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
const { updateResumeController } = require('../controllers/updateResumeController');
const { verifyTokenController } = require('../controllers/verifyTokenController');
const { getSkillsFromProjectsAndExperiences } = require('../controllers/getSkillsFromProjectsAndExperiences');
const { getAtsScores } = require('../controllers/atsScoreControler');
const { getuserProfileByEmailId, createUserProfile, updateUserProfile, deleteuserProfile } = require('../controllers/userProfileController');

const router = express.Router();

router.get('/',defaultController); // this is default one
router.get('/jobs',jobsController);
router.get('/listjobsfromdb',getJobLists);
router.post('/enhancePrompt', enhancePromptController);
router.post('/updateResume', updateResumeController);
router.route("/resume").get(getAllResume).post(createResume);
router.route("/resume-list/:id").get(getResumeById).put(updateResume).delete(deleteResume);
router.post("/login",loginController);
router.post("/signup",signupController);
router.post("/verifyToken",verifyTokenController);
router.post("/skills-suggestion",getSkillsFromProjectsAndExperiences)
router.post("/checkatsscore",getAtsScores);
router.route("/userProfile").get(getuserProfileByEmailId).post(createUserProfile).put(updateUserProfile).delete(deleteuserProfile);

module.exports = router;
