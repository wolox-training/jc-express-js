const axios = require('axios');
const logger = require('../logger');
const config = require('../../config');
const { externalApiError } = require('../errors');
const { Weet } = require('../models');
const { errorHandler } = require('../helpers/dbErrorsHandler');

/**
 * @description call the geek-jokes api
 * @typedef {Object} GeekJoke
 * @property {string} joke
 * @returns {Promise<GeekJoke>} return a joke
 */
exports.getWeet = async () => {
  try {
    const apiUrl = config.common.external_service.geek_joke_url;
    const response = (await axios.get(apiUrl)).data;
    if (response.joke.length <= 140) return response;

    return this.getWeet();
  } catch (error) {
    logger.error(error);
    throw externalApiError(error.message);
  }
};

exports.createWeet = (userId, content) =>
  Weet.create({ userId, content }).catch(errorHandler('Unable to create weet'));

exports.getAllWeets = (offset, limit) =>
  Weet.getAll({ offset, limit }).catch(errorHandler('Unable to get weets'));
