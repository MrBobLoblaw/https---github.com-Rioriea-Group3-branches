const express = require('express');
const surveyCtrl = require('../controllers/surveyController.js');

const router = express.Router();

// Define routes related to surveys
router.post('/submit-survey', surveyCtrl.submitSurvey);

router.route('/api/surveys')
  .get(surveyCtrl.list)

router.param('surveyID', surveyCtrl.surveyByID);
router.route('/api/surveys/:surveyID')
  .get(surveyCtrl.read)
  .put(surveyCtrl.update)
  .delete(surveyCtrl.remove);

module.exports = router;
