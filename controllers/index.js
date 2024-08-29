const express = require('express');
const AuthController = require('./AuthController.js');

const controllers = express.Router();
controllers.use('/auth', AuthController);

module.exports = controllers;