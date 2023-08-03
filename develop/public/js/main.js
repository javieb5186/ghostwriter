//const { articleID } = require('./article');
// Function to make the API call and fetch data
function fetchDataFromAPI() {
  const url = `http://localhost:3001/api/admin/searchall`;
  return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
          console.error('Error fetching data:', error);
          return [];
      });
}

function renderData(data) {
  console.log("Data:", data); // Add this line to check the data being received

  const source = document.getElementById("article-template").innerHTML;
  const template = Handlebars.compile(source);
  const rendered = template({ articles: data });
  document.querySelector(".articles").innerHTML = rendered;

  // Click event listeners to the article links
  const articleLinks = document.querySelectorAll(".article-link");
  articleLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const articleID = link.getAttribute("data-article-id");
      console.log("Clicked article_id:", articleID); // Add this line to check the extracted article_id
      window.location.href = `article.html?article_id=${articleID}`;
    });
  });
}


// Function to handle the category tab click event
function onTabClick(event) {
  // Remove "active" class from all tabs
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.classList.remove("active"));

  // Add "active" class to the clicked tab
  const clickedTab = event.target;
  clickedTab.classList.add("active");

  // Get the selected category from the data-category attribute
  const selectedCategory = clickedTab.getAttribute("data-category");

  // Fetch and render articles based on the selected category
  fetchDataFromAPI(selectedCategory)
      .then(data => renderData(data))
      .catch(error => console.error('Error:', error));
}

// Entry point
document.addEventListener("DOMContentLoaded", () => {
  // Set up the category tab click event
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach(tab => tab.addEventListener("click", onTabClick));

  // Trigger the initial fetch and render using the default selected category (business)
  const defaultCategory = "business";
  fetchDataFromAPI(defaultCategory)
      .then(data => renderData(data))
      .catch(error => console.error('Error:', error));
});


