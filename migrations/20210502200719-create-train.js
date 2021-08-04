'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trains', {
      trainId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      trainName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      trainNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      classes: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      quota: {
        type: Sequelize.JSON,
        allowNull: false
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      departure: {
        type: Sequelize.DATE,
        allowNull: false
      },
      arrival: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      adminId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Administrators',
          key: 'adminId'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trains');
  }
};