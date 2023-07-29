const Content = require('../../models/Content');

async function searchByCategory(category) {
  try {
    // Use the `findAll` method of the `Content` model to search by category
    const results = await Content.findAll({
      where: {
        category,
      },
    });

    // Return the matching rows
    console.log(results);
    return results;
  } catch (error) {
    console.error('Error while searching by category:', error);
    return [];
  }
}

searchByCategory('science');

module.exports = {
  searchByCategory,
};
