'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users_Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      image_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('Users_Likes', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'FK_users_likes_users',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('Users_Likes', {
      fields: ['image_id'],
      type: 'foreign key',
      name: 'FK_users_likes_images',
      references: {
        table: 'Images',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Users_Likes', 'FK_users_likes_images');
    await queryInterface.removeConstraint('Users_Likes', 'FK_users_likes_users');
    await queryInterface.dropTable('Users_Likes');
  }
};
