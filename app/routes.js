const { checkSchema } = require('express-validator');
const { healthCheck } = require('./controllers/healthCheck');
const { getValidationErrors } = require('./middlewares/getValidationErrors');
const { userSignUpSchema } = require('./schemas/user/userSignUpSchema');
const { signUp } = require('./controllers/user.controller');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [checkSchema(userSignUpSchema), getValidationErrors], signUp);
};
