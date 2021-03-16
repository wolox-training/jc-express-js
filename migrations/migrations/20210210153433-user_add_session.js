'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'session_invalidate', {
      type: Sequelize.DATE
    }),

  down: queryInterface => queryInterface.removeColumn('users', 'session_invalidate')
};
