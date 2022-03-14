'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atricle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Atricle.belongsTo(models.User,{
        as: 'author',
        foreignKey: 'author_id'
      })
    }
  };
  Atricle.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Atricle',
    timestamps:false,
    tableName: 'blog_articles'
  });
  return Atricle;
};