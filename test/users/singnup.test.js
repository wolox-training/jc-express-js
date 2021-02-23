const supertest = require('supertest');
const httpStatusCodes = require('http-status-codes');
const {
  encryption,
  uniqueErrorMessage,
  invalidPasswordLengthMessage,
  invalidAlphanumericMessage,
  missingMessage
} = require('../../app/constant');
const app = require('../../app');
const { signupGoodCase, passwordWrongLen, passwordWrongAlphanumeric } = require('../mocks/users.mock');
const { User } = require('../../app/models');
const errors = require('../../app/errors');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);

describe('POST /users', () => {
  it('should response status 201 CREATED when data pass validations', () => {
    createUser(signupGoodCase).then(async res => {
      // check status
      expect(res.statusCode).toBe(httpStatusCodes.CREATED);

      // find user created
      const user = await User.findOne({ where: { email: signupGoodCase.email } });

      const isValidPassword = await encryption.comparePassword({ user, password: signupGoodCase.password });
      expect(isValidPassword).toBe(true);
      expect(user.firstName).toBe(signupGoodCase.firstName);
      expect(user.lastName).toBe(signupGoodCase.lastName);
      expect(user.email).toBe(signupGoodCase.email);
    });
  });

  it('should response status 422 UNPROCESSABLE_ENTITY when password is less than 8 characters', () => {
    createUser(passwordWrongLen).then(res => {
      // check status
      expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY);

      expect(res.body.internal_code).toBe(errors.VALIDATION_ERROR);
      expect(res.body.message).toContain(invalidPasswordLengthMessage);
    });
  });

  it('should response status 422 UNPROCESSABLE_ENTITY when password is not alphanumeric', () => {
    createUser(passwordWrongAlphanumeric).then(res => {
      // check status
      expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY);

      expect(res.body.internal_code).toBe(errors.VALIDATION_ERROR);
      expect(res.body.message).toContain(invalidAlphanumericMessage);
    });
  });

  it('should response status 400 BAD_REQUEST when missing fields', () => {
    createUser({}).then(res => {
      // check status
      expect(res.statusCode).toBe(httpStatusCodes.BAD_REQUEST);

      expect(res.body.internal_code).toBe(errors.MISSING_DATA_ERROR);
      expect(res.body.message).toContain(missingMessage);
    });
  });

  it('should response status 422 UNPROCESSABLE_ENTITY when email already exist', () => {
    createUser(signupGoodCase).then(res => {
      // check status
      expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY);

      expect(res.body.internal_code).toBe(errors.UNIQUE_ENTITY_ERROR);
      expect(res.body.message).toContain(uniqueErrorMessage);
    });
  });
});
