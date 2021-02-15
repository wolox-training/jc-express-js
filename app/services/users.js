const { User } = require('../models');
const { errorHandler } = require('../helpers/dbErrorsHandler');
const { notFoundError } = require('../errors');
const { notFoundErrorMessage, jwt } = require('../helpers');
const config = require('../../config');
const ROLES = require('../constant/roles');

exports.createUser = user => User.create(user).catch(errorHandler('Unable to create user'));

exports.getUserByEmail = email =>
  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        throw notFoundError(notFoundErrorMessage);
      }
      return user;
    })
    .catch(errorHandler('Unable to find user'));

exports.createSessionToken = user => {
  const today = Date.now() / 1000;
  const expirationDate = (Date.now() + config.common.session.expirationTime) / 1000;
  const token = jwt.createToken({
    user_id: user.id,
    role: user.role,
    iat: today,
    exp: expirationDate
  });

  return {
    token,
    expirationDate
  };
};

exports.getAllUsers = (offset, limit) =>
  User.getAll({ offset, limit }).catch(errorHandler('Unable to get users'));

exports.getUserById = id =>
  User.findOne({ where: { id } })
    .then(user => {
      if (!user) {
        throw notFoundError(notFoundErrorMessage);
      }
      return user;
    })
    .catch(errorHandler('Unable to find user'));

exports.createAdminUser = hashedUser =>
  User.createAdmin(hashedUser).catch(errorHandler(`Unable to create ${ROLES.ADMIN_ROLE} user`));
