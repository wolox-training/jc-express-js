const supertest = require('supertest');
const httpStatusCodes = require('http-status-codes');
const app = require('../../app');

const request = supertest(app);
const errors = require('../../app/errors');
const userFactory = require('../factory/users_factory');

const authorization = userFactory.authorizationFactory.regular(1);
const createUser = userFactory.runFactory('user');
const createWeet = () => request.post('/weets').set(authorization);

describe('POST /weets', () => {
  it('should succeed when user is authenticated', done => {
    createUser(1)
      .then(createWeet)
      .then(response => {
        expect(response.statusCode).toBe(httpStatusCodes.CREATED);
        done();
      });
  });

  it('should fail because user is not authenticated', done =>
    request
      .post('/weets')
      .set(userFactory.authorizationFactory.invalid)
      .send({})
      .then(response => {
        expect(response.statusCode).toBe(httpStatusCodes.BAD_REQUEST);
        expect(response.body.internal_code).toBe(errors.AUTHENTICATION_ERROR);
        done();
      }));
});
