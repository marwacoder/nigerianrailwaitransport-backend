'use strict';
module.exports = (sequelize, DataTypes) => {
  const Passenger = sequelize.define('Passenger', {
    passengerId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    name: DataTypes.STRING,
    gender: {
        type: DataTypes.ENUM,
        values:['Male','Female']
      },
    nokPhone: DataTypes.STRING,
    contactAdd: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Passenger.associate = function(models) {
    // associations can be defined here
  };
  return Passenger;
};