// const SourceArticles = require('../../models/SourceArticles');

const saveNewsAPIdata = async (data) => {
  try {
    await SourceArticles.bulkCreate(data);
    console.log('New entry added successfully.');
  } catch (error) {
    console.error('Error adding new entry:', error);
  }
};

module.exports = saveNewsAPIdata;
