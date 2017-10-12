'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.showAllTables().then((tableNames) => {
      tableNames.forEach((table) => {
        if (table === 'card') {
          queryInterface.addColumn(
            'card',
            'id',
            {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
              unique: true,
            });
        }
        if (table === 'media') {
          queryInterface.addColumn(
            'media',
            'id',
            {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
              unique: true,
            });
        }
        if (table === 'userPodcast') {
          queryInterface.addColumn(
            'userPodcast',
            'id',
            {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true,
              unique: true,
            });
        }
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.showAllTables().then((tableNames) => {
      tableNames.forEach((table) => {
        if (table === 'card') {
          queryInterface.removeColumn('card', 'id');
        }
        if (table === 'media') {
          queryInterface.removeColumn('media', 'id');
        }
        if (table === 'userPodcast') {
          queryInterface.removeColumn('userPodcast', 'id');
        }
      });
    });
  }
};
