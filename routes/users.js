const Router = require('express').Router();
const {
  getUserProfile,
} = require('../controllers/users');

Router.get('/me', getUserProfile);

module.exports = Router;
