const { missingMessage } = require('../../constant');

exports.weetSchema = {
  id: {
    in: ['body'],
    exists: {
      errorMessage: missingMessage
    }
  },
  content: {
    in: ['body'],
    exists: {
      errorMessage: missingMessage
    }
  },
  userId: {
    in: ['body'],
    exists: {
      errorMessage: missingMessage
    }
  }
};
