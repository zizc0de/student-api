'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('students', 'date_of_birth', {
      type: Sequelize.DATEONLY
    })
  },
  down: (queryInterface, Sequelize) => {
    
  }
};
