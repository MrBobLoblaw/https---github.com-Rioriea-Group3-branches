const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema({
  schoolName: String,
  onlineClassesRating: String,
  inPersonClassesRating: String,
  productivityRating: String,
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
