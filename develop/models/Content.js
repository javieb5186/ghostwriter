const { Model } = require('sequelize');
const sequelize = require('../config/connection');

class Content extends Model {}

Content.init(
  {

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'content',
  },
);

module.exports = Content;
