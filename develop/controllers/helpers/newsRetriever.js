const path = require('path');
const NewsAPI = require('newsapi');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const categories = ['science', 'entertainment', 'health', 'sports', 'technology', 'general', 'business'];

async function fetchNewsByCategories() {
  const newsPromises = categories.map(async (category) => {
    try {
      const response = await newsapi.v2.topHeadlines({
        category,
        language: 'en',
        sortBy: 'popularity',
        country: 'us',
      });

      // Extracting and storing the required fields for each article
      return response.articles.map((article) => ({
        category,
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
      }));
    } catch (error) {
      console.error(`Error fetching news for category "${category}":`, error.message);
      return [{ category, error: error.message }];
    }
  });

  const newHeadlinesByCategory = await Promise.all(newsPromises);
  const mergedArticles = newHeadlinesByCategory.flat();
  console.log(mergedArticles);

  return mergedArticles;
}

module.exports = {
  fetchNewsByCategories,
};
