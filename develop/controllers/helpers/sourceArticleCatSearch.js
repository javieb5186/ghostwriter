// articleUtils.js
const SourceArticles = require('../../models/SourceArticles');

// Function to search articles by category
async function searchSourceArticlesByCat(category) {
  try {
    console.log(category);
    const articles = await SourceArticles.findAll({
      where: {
        category,
      },
    });

    return articles;
  } catch (error) {
    // Handle any errors that may occur during the database query
    console.error('Error while searching articles by category:', error);
    throw error;
  }
}

module.exports = {
  searchSourceArticlesByCat,
};
