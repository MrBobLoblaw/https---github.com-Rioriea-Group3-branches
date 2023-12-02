const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || 'fallbackSecretKey';

const SurveySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  salt: String                                                                  
});

// Methods for encrypting the password, creating a salt, and generating JWT token
SurveySchema.methods = {
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  generateAuthToken: function() {
    const token = jwt.sign({ _id: this._id }, secretKey); // Replace 'yourSecretKey' with a secure secret key
    return token;
  },
};

module.exports = mongoose.model('Survey', SurveySchema);
