'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Comments', 'image_id', {
      after: 'user_id',
      allowNull: false,
      type: Sequelize.INTEGER
    });

    await queryInterface.addConstraint('Comments', {
      fields: ['image_id'],
      type: 'foreign key',
      name: 'FK_comments_images',
      references: {
        table: 'Images',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Comments', 'FK_comments_images');
    await queryInterface.removeColumn('Comments', 'image_id');
  }
};
