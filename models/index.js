'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// associations 설정
const { users, images, users_likes, comments } = sequelize.models;
comments.belongsTo(users);
comments.belongsTo(images);
images.belongsTo(users);
images.hasMany(comments);
users.hasMany(images);
users.hasMany(comments);

users.belongsToMany(images, {
  through: 'users_likes',
  foreignKey: 'user_id';
});

images.belongsToMany(users, {
  through: 'users_likes',
  foreignKey: 'image_id'
});

users_likes.belongsTo(users, {
  foreignKey: 'user_id'
});

users_likes.belongsTo(images, {
  foreignKey: 'image_id'
});

module.exports = db;
