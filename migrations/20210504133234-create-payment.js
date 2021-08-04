'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      paymentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      trainNameNumber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      class: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fare: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      source: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure: {
        allowNull: false,
        type: Sequelize.STRING
      },
      arrival: {
        allowNull: false,
        type: Sequelize.STRING
      },
      passengerId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Passengers',
          key: 'passengerId'
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
    return queryInterface.dropTable('Payments');
  }
};