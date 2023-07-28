// Import the "SourceArticles" model and the Sequelize instance from your connection file
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../../config');
const SourceArticles = require('../../models/SourceArticles'); // Replace with the correct path to the model file

// Sync the model with the database (create the table if it doesn't exist)
(async () => {
  try {
    await SourceArticles.sync();
    console.log('SourceArticles table has been created (if not existed).');
  } catch (error) {
    console.error('Error syncing the database:', error);
  }
})();

// Function to store news data in the database
async function storeNewsData(newsData) {
  try {
    const newsEntries = Object.entries(newsData);

    await Promise.all(
      newsEntries.map(async ([category, articles]) => {
        await Promise.all(
          articles.map(async (article) => {
            try {
              await SourceArticles.create({
                category: article.category,
                title: article.title,
                description: article.description,
                urlToImage: article.urlToImage,
              });
            } catch (error) {
              console.error(`Error storing news article "${article.title}": ${error}`);
            }
          })
        );
      })
    );
  } catch (error) {
    console.error('Error storing news data:', error);
  }
}

module.exports = storeNewsData;
