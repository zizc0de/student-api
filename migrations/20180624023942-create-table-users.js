'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      'username': {
        type: Sequelize.STRING
      },
      'fullname': {
        type: Sequelize.STRING
      },
      'password': {
        type: Sequelize.STRING
      },
      'token': {
        type: Sequelize.TEXT
      },
      'last_login': {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
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
    return queryInterface.dropTable('users');
  }
};