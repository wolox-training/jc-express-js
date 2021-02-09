const bcrypt = require('bcrypt');
const config = require('../../config');
const logger = require('../logger');
const errors = require('../errors');

exports.hashPassword = user =>
  bcrypt
    .hash(user.password, config.common.encryption.salt_rounds)
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
