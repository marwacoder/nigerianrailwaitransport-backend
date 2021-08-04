'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    trainNameNumber: DataTypes.STRING,
    class: DataTypes.STRING,
    fare: DataTypes.INTEGER,
    source: DataTypes.STRING,
    destination: DataTypes.STRING,
    departure: DataTypes.STRING,
    arrival: DataTypes.STRING,
    passengerId: DataTypes.STRING
  }, {});
  Payment.associate = function(models) {
    // associations can be defined here
  };
  return Payment;
};