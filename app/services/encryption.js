const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../helpers');
const logger = require('../logger');

exports.hashPassword = user =>
  bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then(password => ({ ...user, password }))
    .catch(error => {
      logger.error(error.message);
      throw new Error('failed hash password');
    });

exports.comparePassword = ({ user, password }) => {
  bcrypt.compare(password, user.password).catch(error => {
    logger.error(error.message);
    throw new Error('failed compare password');
  });
};
