const User = require('../models');
const logger = require('../logger');
const { databaseError } = require('../errors');

exports.createUser = user => {
  User.create(user).catch(error => {
    logger.error(error);
    throw databaseError(error.message);
  });
};
