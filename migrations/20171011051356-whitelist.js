'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('whitelist', {
      podcastTitle: {
        type: Sequelize.STRING(60),
      },
      author: {
        type: Sequelize.STRING(60),
      },
      email: {
        type: Sequelize.STRING(80),
        isEmail: true,
      },
      feedUrl: {
        type: Sequelize.STRING(300),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('whitelist');
  },
};
