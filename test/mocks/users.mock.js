const chance = require('chance')();
const { WOLOX_DOMAIN } = require('../../app/constant');

exports.signupGoodCase = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: WOLOX_DOMAIN }) + chance.word({ length: 2 }),
  password: chance.word({ length: 8 }) + chance.integer({ min: 0, max: 9 })
};

exports.passwordWrongLen = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: WOLOX_DOMAIN }) + chance.word({ length: 2 }),
  password: chance.word({ length: 5 }) + chance.integer({ min: 0, max: 1 })
};

exports.passwordWrongAlphanumeric = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: chance.email({ domain: WOLOX_DOMAIN }) + chance.word({ length: 2 }),
  password: `${chance.word({ length: 8 }) + chance.integer(`${{ min: 0, max: 9 }}`)}_-`
};
