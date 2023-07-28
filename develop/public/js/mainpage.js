// const SourceArticles = require("../../models/SourceArticles");

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
