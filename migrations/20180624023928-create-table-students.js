'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      'firstname': {
        type: Sequelize.STRING
      },
      'lastname': {
        type: Sequelize.STRING
      },
      'place_of_birth': {
        type: Sequelize.STRING
      },
      'date_of_birth': {
        type: Sequelize.DATE
      },
      'school': {
        type: Sequelize.STRING
      },
      'degree': {
        type: Sequelize.STRING
      },
      'field_of_study': {
        type: Sequelize.STRING
      },
      'bio': {
        type: Sequelize.TEXT
      },
      'created_at': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },    
      'updated_at': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};
