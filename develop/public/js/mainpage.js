
// tabs
const tabs = document.querySelectorAll('.tablinks');
const tabContentBoxes = document.querySelectorAll('.tabcontent');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('is-active'));
    console.log('test click');
    tab.classList.add('is-active');

    const { target } = tab.dataset;
    tabContentBoxes.forEach((box) => {
      if (box.getAttribute('id') === target) {
        box.classList.remove('is-hidden');
      } else {
        box.classList.add('is-hidden');
      }
    });
  });
});

//const { articleID } = require('./article');
// Function to make the API call and fetch data
function fetchDataFromAPI(category) {
  const url = `http://localhost:3001/api/admin/${category}`;
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

// Handle click event for article links
document.addEventListener("click", (event) => {
  const clickedLink = event.target;
  if (clickedLink.classList.contains("article-link")) {
    event.preventDefault();
    const articleID = clickedLink.getAttribute("data-article-id");
    window.location.href = `article.html?article_id=${articleID}`;
  }
});

// pagination

// // need to get from the different categories and the user selected categories
// application.get('/api/sourceArticles', paginatedResults(SourceArticles), (req, res) => {
//     res.json(res.paginatedResults)
// })

// // pagination middleware
// function paginatedResults(model) {
//     return (req, res, next) => {
//         const page = parseInt(req.query.page)
//         const limit = parseInt(req.query.limit)

//         const startIndex = (page - 1) * limit
//         const endIndex = page * limit

//         const results = {}

//         if (endIndex < model.length) {
//             results.next = {
//                 page: page + 1,
//                 limit: limit
//             }
//         }

//         if (startIndex > 0) {
//             results.previous = {
//                 page: page - 1,
//                 limit: limit
//             }
//         }

//         // this will be different as well - need to research it
//         results.results = model.slice(startIndex, endIndex)

//         res.paginatedResults = results
//         next()
//     }
// }
