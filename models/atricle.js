'use strict';
const moment = require('moment')
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
      });
      Atricle.hasMany(models.Comment,{
        as:'comments',
        foreignKey:'article_id'
      });
    }
    isOwnedBy(user){
      return this.author_id === user.id
    }
  };
  Atricle.init({
    title: DataTypes.STRING
  }, {


    author_id:DataTypes.INTEGER,
    published_on:DataTypes.DATE,
    friendlyPublishedDate:{
      type: DataTypes.VIRTUAL,
      get(){
        return moment (this.published_on).format('MMM Do, YYYY')
      }
    },
    sequelize,
    modelName: 'Atricle',
    timestamps:false,
    tableName: 'blog_articles'
  });
  return Atricle;
};