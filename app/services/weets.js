const axios = require('axios');
const logger = require('../logger');
const config = require('../../config');
const { externalApiError } = require('../errors');

/**
 * @description call the geek-jokes api
 * @typedef {Object} GeekJoke
 * @property {string} joke
 * @returns {GeekJoke} return a joke
 */
exports.getWeet = async () => {
  try {
    const apiUrl = config.common.external_service.geek_joke_url;
    return (await axios.get(apiUrl)).data;
  } catch (error) {
    logger.error(error);
    throw externalApiError(error.message);
  }
};
