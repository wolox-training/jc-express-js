const httpStatusCodes = require('http-status-codes');
const { hashPassword, comparePassword } = require('../helpers/encryptions');
const logger = require('../logger');
const { authenticationError, NOT_FOUND_ERROR } = require('../errors');
const { authenticationErrorMessage } = require('../constant');
const { paginatedResponse, extractFields } = require('../serializers');
const { userSignUpSchema } = require('../schemas/user/userSignUpSchema');

const userService = require('../services/users');

const getUserFields = extractFields({ ...userSignUpSchema, role: 'role' }, 'password');

exports.signUp = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  return hashPassword({ firstName, lastName, email, password })
    .then(userService.createUser)
    .then(user => {
      logger.info(`The user ${user.firstName} has been created`);
      if (user.id) return res.status(httpStatusCodes.CREATED).send({ user_id: user.id });

      return res.status(httpStatusCodes.BAD_REQUEST);
    })
    .catch(error => {
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
      expire_at: expirationDate.toString()
    });
  } catch (error) {
    if (error.internalCode === NOT_FOUND_ERROR) {
      return next(authenticationError(authenticationErrorMessage));
    }
    return next(error);
  }
};

exports.getUsers = (req, res, next) => {
  const { id } = req.params;
  const page = parseInt(req.query.page) || 1;
  const pageSize = req.query.pageSize || 10;
  const offset = (page - 1) * pageSize;
  const limit = parseInt(pageSize);

  const prepareResponse = paginatedResponse({
    resource: 'users',
    offset,
    limit,
    page,
    getFieldsFn: getUserFields
  });

  if (id) {
    return userService
      .getUserById(id)
      .then(response => res.send(getUserFields(response)))
      .catch(next);
  }

  return userService
    .getAllUsers(offset, limit)
    .then(prepareResponse)
    .then(response => {
      res.status(httpStatusCodes.OK).send(response);
    })
    .catch(next);
};

exports.createAdmin = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const userCreatedResponse = () => {
    logger.info(`A user '${firstName} ${lastName}' has been created as administrator`);
    res.status(httpStatusCodes.CREATED).end();
  };
  const userUpdatedResponse = () => {
    logger.info(`A user '${firstName} ${lastName}' has been updated`);
    res.status(httpStatusCodes.NO_CONTENT).end();
  };

  const respond = created => (created ? userCreatedResponse() : userUpdatedResponse());

  return hashPassword({ firstName, lastName, email, password })
    .then(userService.createAdminUser)
    .then(respond)
    .catch(next);
};
