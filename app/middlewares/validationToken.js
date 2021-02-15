const moment = require('moment');
const { jwt } = require('../helpers');
const { User } = require('../models');
const { authenticationError } = require('../errors');
const logger = require('../logger');

exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  const checkToken = () =>
    new Promise((resolve, reject) => {
      try {
        resolve(jwt.decodeToken(authorization));
      } catch (e) {
        reject(e);
      }
    });

  const findUser = token => Promise.all([User.findOne({ where: { id: token.user_id } }), token]);

  const checkActiveSessions = ([user, token]) => {
    if (!user) {
      throw authenticationError('User not found');
    }

    if (
      !user.sessionInvalidate ||
      moment
        .unix(token.iat)
        .utc()
        .isAfter(moment.utc(user.sessionInvalid))
    ) {
      return token;
    }
    throw authenticationError('Invalid token');
  };

  const setLocalData = token => {
    req.locals = { ...req.locals, role: token.role, user_id: token.userId };
    next();
  };

  return checkToken()
    .then(findUser)
    .then(checkActiveSessions)
    .then(setLocalData)
    .catch(e => {
      logger.error(e);
      if (e.internalCode) {
        next(e);
      }
      next(authenticationError('Invalid token'));
    });
};
