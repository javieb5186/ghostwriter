const Content = require('../../models/Content'); // Correct import statement

// Function to search the Sequelize table by article_id
async function findArticleById(articleId) {
  try {
    const article = await Content.findOne({ // Use Content instead of Article
      where: {
        article_id: articleId,
      },
    });

    return article;
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error('Error finding article by ID:', error);
    throw error;
  }
}

module.exports = findArticleById;
