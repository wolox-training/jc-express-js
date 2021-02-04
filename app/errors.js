const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.EXTERNAL_API_ERROR = 'external_api_error';
exports.externalApiError = message => internalError(message, exports.EXTERNAL_API_ERROR);

exports.MISSING_DATA_ERROR = 'missing_data_error';
exports.missingDataError = message => internalError(message, exports.MISSING_DATA_ERROR);

exports.VALIDATION_ERROR = 'validation_error';
exports.validationError = message => internalError(message, exports.VALIDATION_ERROR);
