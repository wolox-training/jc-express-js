const { validationResult } = require('express-validator');
const { missingDataError, validationError } = require('../errors');
const { missingMessage } = require('../helpers');

exports.getValidationErrors = (req, res, next) => {
  const { errors } = validationResult(req);
  const missingFields = errors.filter(e => e.msg === missingMessage);

  if (missingFields.length) {
    const message = `${missingMessage} ${missingFields.map(e => e.param).join(', ')}`;
    return next(missingDataError(message));
  }

  if (errors.length) {
    const message = errors.map(e => `${e.param}: ${e.msg}`).join('. ');
    return next(validationError(message));
  }

  return next();
};
