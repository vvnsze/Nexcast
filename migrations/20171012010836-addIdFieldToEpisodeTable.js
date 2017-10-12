'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'episodes',
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
    queryInterface.removeColumn('episodes', 'id');
  },
};
