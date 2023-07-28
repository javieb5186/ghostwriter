const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the SourceArticles model
const SourceArticles = sequelize.define('SourceArticles', {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(500), // Maximum length of 500 characters
    allowNull: true,
  },
  urlToImage: {
    type: DataTypes.STRING(500), // Maximum length of 500 characters
    allowNull: true,
  },
}, {
  sequelize,
  timestamps: false,
  underscored: true,
  modelName: 'SourceArticles',
});

module.exports = SourceArticles;
