const {
  MISSING,
  WOLOX_DOMAIN_VALIDATION,
  ALPHANUMERIC,
  INVALID_EMAIN_DOMAIN,
  INVALID_PASSWORD_LENGTH,
  INVALID_ALPHANUMERIC,
  INVALID_EMAIL
} = require('../../constant');

exports.userSignUpSchema = {
  firstName: {
    in: ['body'],
    isEmpty: {
      errorMessage: MISSING,
      negated: true
    }
  },
  lastName: {
    in: ['body'],
    isEmpty: {
      errorMessage: MISSING,
      negated: true
    }
  },
  email: {
    in: ['body'],
    isEmpty: {
      errorMessage: MISSING,
      negated: true
    },
    isEmail: {
      errorMessage: INVALID_EMAIL
    },
    matches: {
      options: [WOLOX_DOMAIN_VALIDATION],
      errorMessage: INVALID_EMAIN_DOMAIN
    }
  },
  password: {
    in: ['body'],
    isEmpty: {
      errorMessage: MISSING,
      negated: true
    },
    matches: {
      options: [ALPHANUMERIC],
      errorMessage: INVALID_ALPHANUMERIC
    },
    isLength: {
      options: {
        min: 8
      },
      errorMessage: INVALID_PASSWORD_LENGTH
    }
  }
};
