'use strict';

module.exports = function(sequelize, DataTypes) {

  let User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'username': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'fullname': {
      type: DataTypes.STRING
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: false,
    },
    'role': {
      type: DataTypes.ENUM,
      values: ['Developer', 'Superadmin', 'Admin'],
      defaultValue: 'Admin'
    },
    'token': {
      type: DataTypes.TEXT
    },
    'last_login': {
      type: DataTypes.DATE
    }
  }, {
    timestamp: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    tableName: 'users',
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // User.hasMany(models.Packages);
      }
    }
  });
  
  return User;
};