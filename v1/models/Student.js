'use strict';

module.exports = function(sequelize, DataTypes) {

  let Student = sequelize.define('Student', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'firstname': {
      type: DataTypes.STRING
    },
    'lastname': {
      type: DataTypes.STRING
    },
    'place_of_birth': {
      type: DataTypes.STRING
    },
    'date_of_birth': {
      type: DataTypes.DATE
    },
    'school': {
      type: DataTypes.STRING
    },
    'degree': {
      type: DataTypes.STRING
    },
    'field_of_study': {
      type: DataTypes.STRING
    },
    'bio': {
      type: DataTypes.TEXT
    }
  }, {
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: 'students',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User.hasMany(models.Packages);
      }
    }
  });
  
  return Student;
};