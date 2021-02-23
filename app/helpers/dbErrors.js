const { uniqueEntityError, validationError } = require('../errors');
const { uniqueErrorMessage, validationErrorMessage } = require('../constant');

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
