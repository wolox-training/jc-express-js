const httpStatusCodes = require('http-status-codes');
const { hashPassword, comparePassword } = require('../helpers/encryptions');
const logger = require('../logger');
const { authenticationError, NOT_FOUND_ERROR } = require('../errors');
const { authenticationErrorMessage } = require('../helpers');

const userService = require('../services/users');

exports.signUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  return hashPassword({ firstName, lastName, email, password })
    .then(userService.createUser)
    .then(user => {
      logger.info(`The user ${user.firstName} has been created`);
      res.status(httpStatusCodes.CREATED).send({ user_id: user.id });
    })
    .catch(error => {
      logger.error(error.message);
      next(error);
    });
};

exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    const isValidPassword = await comparePassword({ user, password });

    if (!isValidPassword) throw authenticationError(authenticationErrorMessage);

    const { token, expirationDate } = userService.createSessionToken(user);

    return res.status(httpStatusCodes.OK).send({
      user_id: user.id,
      token,
      expireAt: expirationDate.toString()
    });
  } catch (error) {
    logger.error(error);
    if (error.internalCode === NOT_FOUND_ERROR) {
      return next(authenticationError(authenticationErrorMessage));
    }
    return next(error);
  }
};
