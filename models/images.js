'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.hasMany(models.Comments);
      Images.belongsTo(models.Users, { foreignKey: 'user_id' });
      Images.belongsToMany(models.Users, {
        through: 'Users_Likes',
        foreignKey: 'image_id'
      });
    }
  };
  Images.init({
    likes: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};
