'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Images', 'user_id', {
      after: 'image',
      allowNull: false,
      type: Sequelize.INTEGER
    });

    await queryInterface.addConstraint('Images', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_images_users',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Images', 'FK_images_users');
    await queryInterface.removeColumn('Images', 'user_id');
  }
};
