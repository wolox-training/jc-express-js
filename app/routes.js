const { checkSchema } = require('express-validator');
const { healthCheck } = require('./controllers/healthCheck');
const { getValidationErrors } = require('./middlewares/getValidationErrors');
const { userSignInSchema, userSignUpSchema } = require('./schemas/user');
const usersController = require('./controllers/users.controller');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [checkSchema(userSignUpSchema), getValidationErrors], usersController.signUp);
  app.post('/users/sessions', [checkSchema(userSignInSchema), getValidationErrors], usersController.signIn);
};
