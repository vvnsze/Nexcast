'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('media', {
      type: {
        type: Sequelize.STRING(60),
      },
      link: {
        type: Sequelize.STRING(2083),
        notNull: true,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('media');
  },
};
