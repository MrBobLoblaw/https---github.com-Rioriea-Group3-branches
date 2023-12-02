const Survey = require('../models/survey');

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

module.exports = {
  submitSurvey,
};
