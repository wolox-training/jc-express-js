const { default: Axios } = require('axios');
const logger = require('../logger');

/**
 * @description call the geek-jokes api
 * @typedef {Object} GeekJoke
 * @property {string} joke
 * @returns {GeekJoke} return a joke
 */
async function getWeet() {
  try {
    const apiUrl = 'https://geek-jokes.sameerkumar.website/api?format=json';
    const response = await Axios.get(apiUrl);
    return response.data;
  } catch (error) {
    logger.error(error);
    throw new Error(error);
  }
}

module.exports = {
  getWeet
};
