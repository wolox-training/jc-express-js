const { User } = require('../models');
const { errorHandler } = require('../helpers/dbErrorsHandler');

exports.createUser = user => User.create(user).catch(errorHandler('Unable to create user'));
