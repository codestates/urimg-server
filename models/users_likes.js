'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users_Likes.belongsTo(models.Users, {
        foreignKey: 'user_id'
      });

      Users_Likes.belongsTo(models.Images, {
        foreignKey: 'image_id'
      });
    }
  };
  Users_Likes.init({
    user_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users_Likes',
  });
  return Users_Likes;
};
