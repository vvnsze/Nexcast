'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: Sequelize.STRING(60),
        },
        email: {
          type: Sequelize.STRING(80),
          isEmail: true,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
        },
        confirmationToken: {
          type: Sequelize.STRING,
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  },
};
