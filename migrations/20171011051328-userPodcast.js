'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('userPodcast', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      podcastId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('userPodcast');
  },
};
