'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('episodes',
      {
        podcastId: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING(100),
        },
        guid: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.STRING(4000),
        },
      });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('episodes');
  },
};
