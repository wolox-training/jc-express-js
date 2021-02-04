const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../helpers');
const logger = require('../logger');
const errors = require('../errors');

exports.hashPassword = user =>
  bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then(password => ({ ...user, password }))
    .catch(error => {
      logger.error(error.message);
      throw errors.encryptionError(error.message);
    });

exports.comparePassword = ({ user, password }) => {
  bcrypt.compare(password, user.password).catch(error => {
    logger.error(error.message);
    throw errors.encryptionError(error.message);
  });
};
