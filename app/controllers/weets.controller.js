const httpStatusCodes = require('http-status-codes');
const { paginatedResponse, extractFields } = require('../serializers');
const weetsService = require('../services/weets');
const { weetSchema } = require('../schemas/weet');

const getWeetFields = extractFields({ ...weetSchema });

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

exports.getWeets = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;

  const prepareResponse = paginatedResponse({
    resorce: 'weets',
    offset,
    limit,
    page,
    getFieldsFn: getWeetFields
  });

  return weetsService
    .getAllWeets(offset, limit)
    .then(prepareResponse)
    .then(response => {
      res.status(httpStatusCodes.OK).send(response);
    })
    .catch(next);
};
