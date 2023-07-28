const express = require('express');
const { runCompletion } = require('../helpers/generateArticle');
const newsRetriever = require('../helpers/newsRetriever');
const categorySearch = require('../helpers/categorySearch');
const storeNewsData = require('../helpers/storeSourceData');

const router = express.Router();

// Route for refreshing raw source articles
router.get('/fetch-news', async (req, res) => {
  try {
    // Call the fetchNewsByCategories function from the newsRetriever module
    const newsData = await newsRetriever.fetchNewsByCategories();

    // Store the newsData in a variable (if needed)
    const storedData = newsData;

    // Save the news data using the storeNewsData function
    await storeNewsData(storedData);

    // You can do further processing or send the data as a response to the client
    res.json(storedData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching, storing, or saving news data.' });
  }
});

// Route for querying Content Table by Category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const results = await categorySearch.searchByCategory(category);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error while searching by category' });
  }
});

// Route for Generating Chat GPT Article based on Title/Description/Author
router.post('/generate-article', async (req, res) => {
  const { title, description, author } = req.body;

  try {
    await runCompletion(title, description, author);

    // If you want to send a response back to the client, you can do it here
    res.json({ message: 'Article generated successfully!' });
  } catch (error) {
    // Handle any errors that occurred during the article generation
    res.status(500).json({ error: 'An error occurred while generating the article.' });
  }
});

// Route for storing the ChatGPT response to the content db

module.exports = router;
