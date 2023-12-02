const express = require('express');
const surveyCtrl = require('../controllers/surveyController.js');

const router = express.Router();

router.route('/api/surveys/signin').post(surveyCtrl.signin);

router.route('/api/surveys')
  .post(surveyCtrl.create);

router.route('/api/surveys/:surveyId')
  .get(surveyCtrl.read)
  .put(surveyCtrl.update)
  .delete(surveyCtrl.remove);

// Middleware to handle surveyId parameter
router.param('surveyId', surveyCtrl.surveyByID);

module.exports = router;