const httpStatusCodes = require('http-status-codes');
const weetsService = require('../services/weets');

exports.createWeet = (req, res, next) => {
  const { user_id } = req.locals;
  weetsService
    .getWeet()
    .then(response => {
      const { joke } = response;
      return weetsService.createWeet(user_id, joke);
    })
    .then(() => res.status(httpStatusCodes.CREATED).end())
    .catch(next);
};
