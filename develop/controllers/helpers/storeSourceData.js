const SourceArticles = require('../../models/SourceArticles');
const sourceArticleData = require('../../seeds/sourceArticleData.json');

const newSourceEntries = async (data) => {
  try {
    await SourceArticles.bulkCreate(data);
    console.log('New entry added successfully.');
  } catch (error) {
    console.error('Error adding new entry:', error);
  }
};

module.exports = newSourceEntries;
