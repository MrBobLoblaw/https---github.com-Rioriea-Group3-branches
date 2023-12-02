const express = require('express');
const surveyController = require('../controllers/surveyController');

const router = express.Router();

// Define routes related to surveys
router.post('/submit-survey', surveyController.submitSurvey);

module.exports = router;
