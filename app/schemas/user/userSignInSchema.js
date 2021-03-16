const {
  missingMessage,
  WOLOX_DOMAIN_VALIDATION,
  ALPHANUMERIC,
  invalidEmailDomainMessage,
  invalidPasswordLengthMessage,
  invalidAlphanumericMessage,
  invalidEmailMessage
} = require('../../constant');

exports.userSignInSchema = {
  email: {
    in: ['body'],
    exists: {
      errorMessage: missingMessage
    },
    isEmail: {
      errorMessage: invalidEmailMessage
    },
    matches: {
      options: [WOLOX_DOMAIN_VALIDATION],
      errorMessage: invalidEmailDomainMessage
    }
  },
  password: {
    in: ['body'],
    exists: {
      errorMessage: missingMessage
    },
    matches: {
      options: [ALPHANUMERIC],
      errorMessage: invalidAlphanumericMessage
    },
    isLength: {
      options: {
        min: 8
      },
      errorMessage: invalidPasswordLengthMessage
    }
  }
};
