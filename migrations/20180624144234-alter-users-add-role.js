'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('Developer', 'Superadmin', 'Admin'),
      allowNull: false
    });
  },
  down: (queryInterface, Sequelize) => {

  }
};
