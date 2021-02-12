const { factory } = require('factory-girl');
const chance = require('chance')();
const { User } = require('../../app/models');
const { WOLOX_DOMAIN } = require('../../app/constant');
const { encryption } = require('../../app/helpers');
const { extractField } = require('../../app/serializers');
const usersService = require('../../app/services/users');

factory.define('user', User, {
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  email: factory.seq('User.email', n => `mail-${n}@${WOLOX_DOMAIN}${chance.word({ length: 2 })}`),
  password: () => encryption.hashPassword({ password: 'wolox123' }).then(hashed => hashed.password)
});

exports.runFactory = factoryName => count =>
  factory.createMany(factoryName, count).then(extractField('dataValues'));

exports.authorizationFactory = {
  regular: id => ({ authorization: usersService.createSessionToken({ id }).token }),
  invalid: { authorization: 'invalid' }
};
