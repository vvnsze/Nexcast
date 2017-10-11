'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('podcasts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING(100),
      },
      feed_url: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING(2000),
      },
      image_url: {
        type: Sequelize.STRING(2680),
      },
      email: {
        type: Sequelize.STRING(80),
        isEmail: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('podcasts')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
