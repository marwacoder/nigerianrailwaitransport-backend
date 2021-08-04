'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    ticketId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    passengerName: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    contactAdd: DataTypes.STRING,
    nokPhoneNumber: DataTypes.STRING,
    authId: DataTypes.STRING,
    trainId: DataTypes.STRING
  }, {});
  Ticket.associate = function(models) {
    // associations can be defined here

    // Ticket.hasOne(models.Auth, {
    //   as: 'tickets',
    //   foreignKey: 'authId',
    // })

    Ticket.belongsTo(models.Train, {
      as: 'train',
      foreignKey: 'trainId',
    })
  };
  return Ticket;
};