'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Images);
      Users.hasMany(models.Comments);
      Users.belongsToMany(models.Images, {
        through: 'Users_Likes',
        foreignKey: 'user_id'
      });
    }
  };
  Users.init({
    user_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};
