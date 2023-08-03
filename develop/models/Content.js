const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Content extends Model {}
Content.init(
  {
    article_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    BlogPost: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlToImage: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'content',
  },
);
module.exports = Content;
