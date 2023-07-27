const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

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
    type: DataTypes.TEXT,
    allowNull: true,
  },
  urlToImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Sync the model with the database (create the table if it doesn't exist)
(async () => {
  try {
    await sequelize.sync();
    console.log('SourceArticles table has been created (if not existed).');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
})();

module.exports = SourceArticles;
