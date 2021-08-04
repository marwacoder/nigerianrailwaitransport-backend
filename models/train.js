'use strict';
module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define('Train', {
    trainId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    trainName: DataTypes.STRING,
    trainNumber: DataTypes.INTEGER,
    classes: DataTypes.JSON,
    quota: DataTypes.JSON,
    source: DataTypes.STRING,
    destination: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    departure: DataTypes.DATE,
    arrival: DataTypes.DATE,
    adminId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Administrators',
        key: 'adminId'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {});
  Train.associate = function (models) {
    // associations can be defined here

    Train.hasMany(models.Ticket, {
      as: 'train',
      foreignKey: 'trainId',
    })
  };
  return Train;
};