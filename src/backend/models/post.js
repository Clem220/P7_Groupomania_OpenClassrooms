'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {

    static associate(models) {
      models.post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });

      models.post.hasMany(models.Comment);

    }
  }
  post.init({
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};