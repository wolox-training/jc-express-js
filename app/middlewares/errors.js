const httpStatusCodes = require('http-status-codes');
const errors = require('../errors');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

// Check status codes here: https://www.npmjs.com/package/http-status-codes
const statusCodes = {
  // 4.x.x
  [errors.EXTERNAL_API_ERROR]: httpStatusCodes.BAD_GATEWAY,
  [errors.VALIDATION_ERROR]: httpStatusCodes.UNPROCESSABLE_ENTITY,
  [errors.MISSING_DATA_ERROR]: httpStatusCodes.BAD_REQUEST,

  // 5.x.x
  [errors.DEFAULT_ERROR]: httpStatusCodes.INTERNAL_SERVER_ERROR,
  [errors.DATABASE_ERROR]: httpStatusCodes.SERVICE_UNAVAILABLE,
  [errors.ENCRYPTION_ERROR]: httpStatusCodes.INTERNAL_SERVER_ERROR
};

exports.handle = (error, req, res, next) => {
  if (error.internalCode) res.status(statusCodes[error.internalCode] || DEFAULT_STATUS_CODE);
  else {
    // Unrecognized error, notifying it to rollbar.
    next(error);
    res.status(DEFAULT_STATUS_CODE);
  }
  logger.error(error);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
