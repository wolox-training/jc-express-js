const supertest = require('supertest');
const httpStatusCodes = require('http-status-codes');
const app = require('../../app');

const request = supertest(app);
const { AUTHENTICATION_ERROR } = require('../../app/errors');
const userFactory = require('../factory/users_factory');
const { REGULAR_ROLE } = require('../../app/constant/roles');

const createUsers = userFactory.runFactory('user');
const createWeets = userFactory.runFactory('weet');

const checkSuccessfulResponse = response => {
  expect(response.statusCode).toBe(httpStatusCodes.OK);
  expect(response.body.total_count).toBe(5);
  response.body.page.forEach(item => {
    expect(item).toHaveProperty('userId');
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('content');
  });
};

const getWeets = (type, id) => () => {
  const auth = id && type ? userFactory.authorizationFactory[type](id) : {};
  return request.get('/weets').set(auth);
};

describe('GET /weets', () => {
  it('should be success when user is authenticated and requested user exists', () =>
    createUsers(2)
      .then(() => {
        createWeets(5);
      })
      .then(getWeets(REGULAR_ROLE, 1))
      .then(checkSuccessfulResponse));

  it('should fail because user is not authenticated', () =>
    createUsers(2)
      .then(() => {
        createWeets(5);
      })
      .then(getWeets())
      .then(response => {
        expect(response.statusCode).toBe(httpStatusCodes.UNAUTHORIZED);
        expect(response.body.internal_code).toBe(AUTHENTICATION_ERROR);
      }));
});
