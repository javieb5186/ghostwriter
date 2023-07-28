const { Model, DataTypes, json } = require('sequelize');
const fs = require('fs');
const sequelize = require('../config/connection');



class Content extends Model {}

Content.init(
  {

      article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
