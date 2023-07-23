const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class Article extends Model {}

Article.init(
  {

  },
  {
    sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'article',
  },
);

module.exports = Article;
