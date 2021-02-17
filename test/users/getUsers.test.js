const httpStatusCodes = require('http-status-codes');
const supertest = require('supertest');
const app = require('../../app');

const request = supertest(app);
const userFactory = require('../factory/users_factory');
const { AUTHENTICATION_ERROR } = require('../../app/errors');

const createUsers = userFactory.runFactory('user');
const expected = {
  total_count: 25,
  total_pages: 3,
  count: 10,
  status: 200,
  previous_page: null,
  next_page: null
};

const getNextRequest = page =>
  request.get(`/users?page=${page}`).set(userFactory.authorizationFactory.regular(1));

const checkResponse = (response, expectedValues) => {
  expect(response.statusCode).toBe(expectedValues.status);
  expect(response.body.previous_page).toBe(expectedValues.previous_page);
  expect(response.body.next_page).toBe(expectedValues.next_page);
  expect(response.body.total_count).toBe(expectedValues.total_count);
  expect(response.body.count).toBe(expectedValues.count);
};

describe('GET /users', () => {
  it('should success when user is logged in', done => {
    createUsers(25)
      .then(() => request.get('/users').set(userFactory.authorizationFactory.regular(1)))
      .then(response => {
        checkResponse(response, { ...expected, next_page: 2 });
        return getNextRequest(2);
      })
      .then(response => {
        checkResponse(response, {
          ...expected,
          next_page: 3,
          previous_page: 1
        });
        return getNextRequest(3);
      })
      .then(response => {
        checkResponse(response, {
          ...expected,
          count: 5,
          previous_page: 2
        });
        done();
      });
  });

  it('should fail because user is not authenticated', done => {
    request
      .get('/users')
      .set(userFactory.authorizationFactory.invalid)
      .then(response => {
        expect(response.statusCode).toBe(httpStatusCodes.UNAUTHORIZED);
        expect(response.body.internal_code).toBe(AUTHENTICATION_ERROR);
        done();
      });
  });
});
