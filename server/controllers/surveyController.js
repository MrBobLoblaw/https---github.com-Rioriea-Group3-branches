const Survey = require('../models/survey.js');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const survey = new Survey(req.body);
  try {
    await survey.save();
    // Generate a JWT token
    const token = survey.generateAuthToken();
    return res.status(200).json({
      message: 'Successfully created survey!',
      token: token,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
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

module.exports = { create, read, remove, update };