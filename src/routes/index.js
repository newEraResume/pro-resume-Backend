const express = require('express');
const { enhancePromptController } = require('../controllers/enhancePropmptController');
const {defaultController} = require('../controllers/defaultController');

const router = express.Router();

router.get('/',defaultController); // this is default one
router.post('/enhancePrompt', enhancePromptController);

module.exports = router;
