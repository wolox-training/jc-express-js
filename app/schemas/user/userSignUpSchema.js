const {
  missingMessage,
  WOLOX_DOMAIN,
  ALPHANUMERIC,
  invalidEmailDomainMessage,
  invalidPasswordLengthMessage,
  invalidAlphanumericMessage,
  invalidEmailMessage
} = require('../../helpers');

exports.userSignUpSchema = {
  firstName: {
    in: ['body'],
    isEmpty: {
      errorMessage: missingMessage,
      negated: true
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      errorMessage: missingMessage,
      negated: true
    }
  },
  email: {
    in: ['body'],
    isEmpty: {
      errorMessage: missingMessage,
      negated: true
    },
    isEmail: {
      errorMessage: invalidEmailMessage
    },
    matches: {
      options: [WOLOX_DOMAIN],
      errorMessage: invalidEmailDomainMessage
    }
  },
  password: {
    in: ['body'],
    isEmpty: {
      errorMessage: missingMessage,
      negated: true
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
