const Content = require('../../models/Content');

const saveGPTdata = async (data) => {
  console.log('saveGPTdata function ran');
  console.log(data);
  try {
    await Content.create(data);
    console.log('New entries added successfully.');
  } catch (error) {
    console.error('Error adding new entries:', error);
  }
};

module.exports = { saveGPTdata };
