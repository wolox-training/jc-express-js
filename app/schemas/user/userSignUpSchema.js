const { MISSING, INVALID_CONTENT, WOLOX_DOMAIN, ALPHANUMERIC } = require('../../helpers');

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
      errorMessage: INVALID_CONTENT
    },
    matches: {
      options: [WOLOX_DOMAIN],
      errorMessage: INVALID_CONTENT
    }
  },
  password: {
    in: ['body'],
    isEmpty: {
      errorMessage: MISSING,
      negated: true
    },
    matches: {
      options: [ALPHANUMERIC]
    },
    isLength: {
      options: {
        min: 8
      },
      errorMessage: 'must be a minimum of 8 characters'
    }
  }
};
