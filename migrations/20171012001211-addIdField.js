'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'whitelist',
      'id',
      {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('whitelist', 'id');
  }
};
