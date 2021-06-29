'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Images', 'image', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Users', 'profile_image', {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Users', 'profile_image', {
      type: Sequelize.BLOB
    });

    await queryInterface.changeColumn('Images', 'image', {
      type: Sequelize.BLOB
    });
  }
};
