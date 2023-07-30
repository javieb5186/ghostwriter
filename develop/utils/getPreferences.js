const data = require('../seeds/sourceArticleData.json');

async function getPrefs() {
  const relevantData = [];
  let count = 0;
  let cat;

  // Gets six objects for each category
  const sixEach = data.map((value) => {
    if (cat === undefined) {
      cat = value.category;
    }

    if (value.category === cat && count < 6) {
      count += 1;
      return value;
    }

    if (value.category !== cat) {
      cat = value.category;
      count = 0;
    }
    return null;
  });

  // Only adding true objects
  sixEach.forEach((value) => {
    if (value !== null) {
      relevantData.push(value);
    }
  });

  // Setting up variables
  const names = [];
  let name;
  let hasName = false;

  // Getting category name
  relevantData.forEach((value) => {
    if (name === undefined) {
      name = value.category;
    }

    if (name === value.category && !hasName) {
      names.push(value.category);
      hasName = true;
    }

    if (name !== value.category) {
      name = value.category;
      hasName = false;
    }
  });

  // Setting up variables
  const prefs = [];
  let relImages = [];
  const allImages = [];

  // Combining names and urls
  for (let x = 0; x < names.length; x += 1) {
    let first = false;
    for (let y = 0; y < relevantData.length; y += 1) {
      if (names[x] === relevantData[y].category) {
        if (relevantData[y].urlToImage === null) {
          relImages.push('https://bulma.io/images/placeholders/128x128.png');
        } else {
          relImages.push(relevantData[y].urlToImage);
        }

        if (!first) {
          first = true;
          allImages.push(relevantData[y].urlToImage);
        }
      }
    }
    const n = names[x];
    prefs.push({ n, relImages });
    relImages = [];
  }
  allImages.push('https://bulma.io/images/placeholders/128x128.png');

  prefs.push({ n: 'all', relImages: allImages });

  return prefs;
}

module.exports = getPrefs;
