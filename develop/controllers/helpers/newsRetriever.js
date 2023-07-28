const dotenv = require('dotenv');
const NewsAPI = require('newsapi');

dotenv.config();
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const categories = ['science', 'entertainment', 'health', 'sports', 'technology'];

async function fetchNewsByCategories() {
  const newsPromises = categories.map(async (category) => {
    try {
      const response = await newsapi.v2.topHeadlines({
        category,
        language: 'en',
        sortBy: 'popularity',
        country: 'us',
      });

      // Extracting and storing the required fields (including the category) for each article
      return {
        category,
        articles: response.articles.map((article) => ({
          title: article.title,
          description: article.description,
          urlToImage: article.urlToImage,
        })),
      };
    } catch (error) {
      console.error(`Error fetching news for category "${category}":`, error.message);
      return {
        category,
        error: error.message,
      };
    }
  });

  const newHeadlines = await Promise.all(newsPromises);

  return newHeadlines.reduce((acc, cur) => {
    acc[cur.category] = cur.articles || { error: cur.error };
    return acc;
  }, {});
}

module.exports = {
  fetchNewsByCategories,
};
