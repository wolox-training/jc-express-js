const { uniqueEntityError, validationError } = require('../errors');
const { uniqueErrorMessage, validationErrorMessage } = require('./constants');

exports.dbErrorCodes = {
  SequelizeUniqueConstraintError: {
    message: uniqueErrorMessage,
    errorFn: uniqueEntityError
  },
  SequelizeValidationError: {
    message: validationErrorMessage,
    errorFn: validationError
  }
};
