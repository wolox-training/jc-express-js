const supertest = require('supertest');
const httpStatusCodes = require('http-status-codes');
const app = require('../../app');

const request = supertest(app);

const { User } = require('../../app/models');
const { signupGoodCase } = require('../mocks/users.mock');
const { FORBIDDEN_ERROR } = require('../../app/errors');
const ROLES = require('../../app/constant/roles');
const userFactory = require('../factory/users_factory');

const createUsers = userFactory.runFactory('user');
const createUserAndLogin = type =>
  createUsers(1).then(result =>
    request
      .post('/admin/users')
      .send(signupGoodCase)
      .set(userFactory.authorizationFactory[type](result[0].id))
  );

describe('POST /admin/users', () => {
  it('should succeed when user has authorization (create new admin)', () => {
    const findUser = response => {
      expect(response.statusCode).toBe(httpStatusCodes.CREATED);
      return User.findOne({ where: { email: signupGoodCase.email } });
    };

    return createUserAndLogin(ROLES.ADMIN_ROLE)
      .then(findUser)
      .then(response => {
        expect(response.firstName).toBe(signupGoodCase.firstName);
        expect(response.lastName).toBe(signupGoodCase.lastName);
        expect(response.email).toBe(signupGoodCase.email);
      });
  });

  it('should succeed when user has authorization (update existing user)', () => {
    const sendAdminUser = ([user, userToUpdate]) =>
      Promise.all([
        request
          .post('/admin/users')
          .send({ ...signupGoodCase, email: userToUpdate.email })
          .set(userFactory.authorizationFactory.admin(user.id)),
        userToUpdate
      ]);
    const findUser = ([response, userToUpdate]) => {
      expect(response.statusCode).toBe(httpStatusCodes.NO_CONTENT);
      return User.findOne({ where: { email: userToUpdate.email } });
    };

    return createUsers(2)
      .then(sendAdminUser)
      .then(findUser)
      .then(response => {
        expect(response.role).toBe(ROLES.ADMIN_ROLE);
      });
  });

  it('should fail because user is not authorized', () =>
    createUserAndLogin(ROLES.REGULAR_ROLE).then(response => {
      expect(response.statusCode).toBe(httpStatusCodes.FORBIDDEN);
      expect(response.body.internal_code).toBe(FORBIDDEN_ERROR);
    }));
});
