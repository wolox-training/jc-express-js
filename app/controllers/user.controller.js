const StatusCodes = require('http-status-codes');
const { hashPassword } = require('../services/encryption');

const logger = require('../logger');

const userService = require('../services/user');

exports.signUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  return hashPassword({ firstName, lastName, email, password })
    .then(userService.createUser)
    .then(user => {
      logger.info(`The user ${user.firstName} has been created`);
      res.status(StatusCodes.CREATED).send({ user_id: user.id });
    })
    .catch(error => {
      logger.error(error.message);
      next(error);
    });
};
