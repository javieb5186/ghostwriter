// models/TechnologyNews.js

const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

class SourceArticles extends Model {}

SourceArticles.init(
  {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    urlToImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SourceArticles",
    tableName: "SourceArticles", // You can change the table name if needed
    timestamps: false, // If you want timestamps, change this to true
  }
);

module.exports = SourceArticles;

