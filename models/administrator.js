'use strict';
module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define('Administrator', {
     adminId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    gender: {
        allowNull: false,
        type: DataTypes.ENUM,
        values:['Male','Female']
      },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Administrator.associate = function(models) {
    // associations can be defined here
  };
  return Administrator;
};