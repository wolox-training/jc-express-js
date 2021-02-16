const { checkSchema } = require('express-validator');
const { healthCheck } = require('./controllers/healthCheck');
const { getValidationErrors } = require('./middlewares/getValidationErrors');
const { validatePermissions } = require('./middlewares/validatePermissions');
const { userSignInSchema, userSignUpSchema } = require('./schemas/user');
const usersController = require('./controllers/users.controller');
const weetsController = require('./controllers/weets.controller');
const { validateToken } = require('./middlewares/validationToken');
const ROLES = require('./constant/roles');

exports.init = app => {
  app.get('/health', healthCheck);

  app.post('/users', [checkSchema(userSignUpSchema), getValidationErrors], usersController.signUp);
  app.post('/users/sessions', [checkSchema(userSignInSchema), getValidationErrors], usersController.signIn);
  app.get('/users', validateToken, usersController.getUsers);
  app.post(
    '/admin/users',
    [
      checkSchema(userSignUpSchema),
      getValidationErrors,
      validateToken,
      validatePermissions([ROLES.ADMIN_ROLE])
    ],
    usersController.createAdmin
  );

  app.post('/weets', validateToken, weetsController.createWeet);
};
