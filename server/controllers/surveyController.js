const Survey = require('../models/survey.js');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');

const submitSurvey = async (req, res) => {
  try {
    const surveyData = req.body;
    const newSurvey = new Survey(surveyData);
    await newSurvey.save();
    res.status(201).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const list = async (req, res) => {
  try {
    let surveys = await Survey.find().select('schoolName onlineClassesRating inPersonClassesRating productivityRating');
    res.json(surveys);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let survey = req.profile;
    survey = _.extend(survey, req.body); // Use _.extend from lodash
    survey.updated = Date.now();
    await survey.save();
    survey.salt = undefined;
    res.json(survey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let survey = req.profile;
    let deletedSurvey = await survey.remove();
    deletedSurvey.salt = undefined;
    res.json(deletedSurvey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = {
  submitSurvey,
  list,
  read,
  update,
  remove,
};
