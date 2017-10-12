'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.showAllTables().then((tableNames) => {
      tableNames.forEach((table) => {
        queryInterface.addColumn(table, 'createdAt',
          { type: Sequelize.DATE }
        );
        queryInterface.addColumn(table, 'updatedAt',
          { type: Sequelize.DATE }
        );
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.showAllTables().then((tableNames) => {
      tableNames.forEach((table) => {
        queryInterface.removeColumn(table, 'createdAt');
        queryInterface.removeColumn(table, 'updatedAt');
      });
    });
  },
};
