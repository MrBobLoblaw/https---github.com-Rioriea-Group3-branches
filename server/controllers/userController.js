const User = require('../models/user.js');
const _ = require('lodash');
const errorHandler = require('./error.controller.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const create = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // Generate a JWT token
    const token = user.generateAuthToken();
    return res.status(200).json({
      message: 'Successfully signed up!',
      token: token,
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const list = async (req, res) => {
  try {
    let users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status(400).json({
        error: 'User not found',
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Could not retrieve user',
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
    let user = req.profile;
    user = _.extend(user, req.body); // Use _.extend from lodash
    user.updated = Date.now();
    await user.save();
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.remove();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, return an error
    if (!user || !bcrypt.compareSync(password, user.hashed_password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, secretKey); // Replace 'yourSecretKey' with a secure secret key

    // Send the token in the response
    res.json({
      message: 'Signin successful',
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

module.exports = { create, userByID, read, list, remove, update, signin };