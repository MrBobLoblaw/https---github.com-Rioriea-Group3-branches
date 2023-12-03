const Survey = require('../models/survey.js');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');

const create = async (req, res) => {
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
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let survey = req.profile;
    survey = _.extend(survey, req.body); // Use _.extend from lodash
    survey.updated = Date.now();
    await survey.save();
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
    res.json(deletedSurvey);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const surveyByID = async (req, res, next, id) => { 
  console.log(id)
  try {
    let survey = await Survey.findById(id) 
    if (!survey)
      return res.status('400').json({ 
        error: "Survey not found"
      })
    req.profile = survey 
    next()
  } catch (err) {
    return res.status('400').json({ 
      error: "Could not retrieve survey"
    }) 
  }
}

module.exports = {
  create,
  surveyByID,
  list,
  read,
  update,
  remove,
};
