const { factory } = require('factory-girl');
const chance = require('chance')();
const { User, Weet } = require('../../app/models');
const { WOLOX_DOMAIN } = require('../../app/constant');
const ROLES = require('../../app/constant/roles');
const { encryption } = require('../../app/helpers');
const { extractField } = require('../../app/serializers');
const usersService = require('../../app/services/users');

factory.define('user', User, {
  firstName: factory.chance('first'),
  lastName: factory.chance('last'),
  email: factory.seq('User.email', n => `mail-${n}@${WOLOX_DOMAIN}${chance.word({ length: 2 })}`),
  password: () => encryption.hashPassword({ password: 'wolox123' }).then(hashed => hashed.password)
});

factory.define('weet', Weet, {
  userId: 1,
  content: chance.word({ length: 139 })
});

exports.runFactory = factoryName => count =>
  factory.createMany(factoryName, count).then(extractField('dataValues'));

exports.authorizationFactory = {
  regular: id => ({ authorization: usersService.createSessionToken({ id, role: ROLES.REGULAR_ROLE }).token }),
  admin: id => ({ authorization: usersService.createSessionToken({ id, role: ROLES.ADMIN_ROLE }).token }),
  invalid: { authorization: 'invalid' }
};
