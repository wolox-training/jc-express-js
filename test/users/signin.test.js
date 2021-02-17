const supertest = require('supertest');
const httpStatusCodes = require('http-status-codes');
const app = require('../../app');
const { signupGoodCase } = require('../mocks/users.mock');
const { User } = require('../../app/models');
const { VALIDATION_ERROR, MISSING_DATA_ERROR, AUTHENTICATION_ERROR } = require('../../app/errors');
const {
  invalidAlphanumericMessage,
  invalidEmailDomainMessage,
  missingMessage,
  authenticationErrorMessage
} = require('../../app/constant');

const request = supertest(app);
const createUser = user => request.post('/users').send(user);
const singInUser = user => request.post('/users/sessions').send(user);

describe('POST /users/sessions', () => {
  it('should response status 200 OK when is authenticated successfully', done => {
    createUser(signupGoodCase)
      .then(() => singInUser({ email: signupGoodCase.email, password: signupGoodCase.password }))
      .then(res => {
        expect(res.statusCode).toBe(httpStatusCodes.OK);
        expect(res.body).toHaveProperty('user_id');
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('expire_at');

        // find user created
        User.findOne({ where: { id: res.body.user_id } }).then(user => {
          expect(user.email).toBe(signupGoodCase.email);
          done();
        });
      });
  });

  it('should response status 422 UNPROCESSABLE_ENTITY when password is not alphanumeric', done => {
    createUser(signupGoodCase)
      .then(() => singInUser({ email: signupGoodCase.email, password: `${signupGoodCase.password}_-.` }))
      .then(res => {
        expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY);
        expect(res.body.internal_code).toBe(VALIDATION_ERROR);
        expect(res.body.message).toContain(invalidAlphanumericMessage);
        done();
      });
  });

  it('should response status 422 UNPROCESSABLE_ENTITY when email does not have wolox domain', done => {
    createUser(signupGoodCase)
      .then(() => singInUser({ email: 'test@any.com', password: signupGoodCase.password }))
      .then(res => {
        expect(res.statusCode).toBe(httpStatusCodes.UNPROCESSABLE_ENTITY);
        expect(res.body.internal_code).toBe(VALIDATION_ERROR);
        expect(res.body.message).toContain(invalidEmailDomainMessage);
        done();
      });
  });

  it('should response status 400 BAD_REQUEST when are missing some property', done => {
    singInUser({}).then(res => {
      expect(res.statusCode).toBe(httpStatusCodes.BAD_REQUEST);
      expect(res.body.internal_code).toBe(MISSING_DATA_ERROR);
      expect(res.body.message).toContain(missingMessage);
      done();
    });
  });

  it('should response status 400 BAD_REQUEST when wrong credentials ', done => {
    createUser(signupGoodCase)
      .then(() => singInUser({ email: `${signupGoodCase.email}.wrong`, password: signupGoodCase.password }))
      .then(res => {
        expect(res.statusCode).toBe(httpStatusCodes.UNAUTHORIZED);
        expect(res.body.internal_code).toBe(AUTHENTICATION_ERROR);
        expect(res.body.message).toContain(authenticationErrorMessage);
        done();
      });
  });
});
