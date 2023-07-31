// Function to fetch article data from the API
const Handlebars = require('express-handlebars');

function fetchArticleData(articleID) {
  const apiUrl = `http://localhost:3001/api/admin/gptAricles/${articleID}`;
  console.log(apiUrl);
  return fetch(apiUrl)
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error fetching article data:', error);
      return null;
    });
}

// Function to render the article using Handlebars
function renderArticle(articleData) {
  if (!articleData) {
    console.error('No article data to render.');
    return;
  }

  const source = document.getElementById('article-template').innerHTML;
  const template = Handlebars.compile(source);
  const renderedHtml = template(articleData);

  const articleContainer = document.getElementById('article-container');
  articleContainer.innerHTML = renderedHtml;
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
  // Get the article_id from the query parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const articleID = urlParams.get('article_id');

  // Fetch article data and render the article
  if (articleID) {
    fetchArticleData(articleID)
      .then((articleData) => renderArticle(articleData))
      .catch((error) => console.error('Error:', error));
  } else {
    console.error('No article_id found in the query parameter.');
  }
});
