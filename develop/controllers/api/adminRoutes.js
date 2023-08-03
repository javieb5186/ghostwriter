const express = require('express');
const { runCompletion } = require('../helpers/generateArticle');
const newsRetriever = require('../helpers/newsRetriever');
const categorySearch = require('../helpers/categorySearch');
const storeNewsData = require('../helpers/storeSourceData');
const seedDatabase = require('../../seeds/seed');
const findArticleById = require('../helpers/article_idSearch');
const articleUtils = require('../helpers/sourceArticleCatSearch');
const { saveGPTdata } = require('../helpers/storeGPTresponse');
// const isAdmin = require('../../utils/isAdmin');

const { searchByContent } = require('../helpers/contentinv');


const router = express.Router();

// Route for seeding DB
router.get('/seed-data', async (req, res) => {
  try {
    // Call the seedDatabase function to seed the data
    await seedDatabase();
    res.status(200).send('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route for refreshing raw source articles
router.get('/fetch-news', async (req, res) => {
  try {
    // Call the fetchNewsByCategories function from the
    // newsRetriever module inside the route handler
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

router.get('/searchall', async (req, res) => {
  

  try {
  
    const results = await searchByContent(); 
    res.json(results);
  } catch (error) {
    console.error('Error while searching articles by category:', error);
    res.status(500).json({ error: 'Error while searching articles by category' });
  }
});

// Route for querying SourceArticles Table by Category
router.get('/category/:category', async (req, res) => {
  const { category } = req.params;
  try {
    const { category } = req.params;

    // Call the searchSourceArticlesByCat function to get articles by category
    const articles = await articleUtils.searchSourceArticlesByCat(category);

    // Send the articles as a response
    res.json(articles);
  } catch (error) {
    // Handle any errors that may occur during the request
    console.error('Error while searching articles by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for querying Content Table by Category
router.get('/:category', async (req, res) => {
  const { category } = req.params;
  try {
    // Call the searchByCategory function from the categorySearch module inside the route handler
    const results = await categorySearch.searchByCategory(category);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error while searching by category' });
  }
});

// Route for saving GPT data
router.post('/save-gpt-data', async (req, res) => {
  const { data } = req.body;

  try {
    // Call the saveGPTdata function to save the GPT data
    await saveGPTdata(data);
    res.status(200).json({ message: 'GPT data saved successfully!' });
  } catch (error) {
    console.error('Error saving GPT data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route for Generating Chat GPT Article based on Title/Description/Author
router.post('/generate-article', async (req, res) => {
  const { title, description, author } = req.body;

  try {
    const jsonObject = await runCompletion(title, description, author);

    if (jsonObject) {
      // Send the JSON response received from the runCompletion function
      res.json(jsonObject);
    } else {
      res.status(500).json({ error: 'An error occurred while generating the article.' });
    }
  } catch (error) {
    // Handle any errors that occurred during the article generation
    res.status(500).json({ error: 'An error occurred while generating the article.' });
  }
});

// Route for /articles/:articleId
router.get('/gptAricles/:articleId', async (req, res) => {
  const { articleId } = req.params;
  const intArticleId = parseInt(articleId, 10); // Parse the articleId as an integer
  console.log(intArticleId);

  try {
    const article = await findArticleById(intArticleId);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const Content = require('../../models/Content');
  Content.destroy({
    where: {
      article_id:req.params.id
    },
  })
    .then((deletedArticle) => {
      res.json(deletedArticle);
   })
  .catch((err) => res.json(err));
});

router.put('/:id', async (req, res) => {
  const Content = require('../../models/Content');

  var temp = req.params.id;
  const myArray = temp.split("@");
  // console.log(myArray[0] + " " + myArray[1])
  Content.update(
    {
     
      Title: myArray[1],
      
    },
    {
      // Gets the article based on the id given in the request parameters
      where: {
        article_id: myArray[0],
      }
    }
  )
    .then((updatedContent) => {
      // Sends the updated article as a json response
      console.log(updatedContent)
      res.json(updatedContent);
    })
    .catch((err) => res.json(err));
});



// route to render the Create Artucle page
router.get('/adminTools/generator', (req, res) => {
  try {
    res.render('generate');
  } catch (error) {
    console.error('Error serving generator.html:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
