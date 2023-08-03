const Content = require('../../models/Content');
//console.log("content.js")
async function searchByContent() {
  try {

    const results = await Content.findAll({
    
    });

    //console.log(results);
  
   
    return results;
  } catch (error) {
    //console.error('Error while searching by category:', error);
    return [];
  }
}

searchByContent();

module.exports = {
  searchByContent,
};