// Initialize selectedCategory as 'science'
let selectedCategory = 'science';

const sourceArticleJSON = {
  category: 'science',
  Title: 'Moon gear: China building lander, rover and spacesuit for lunar missions (video) - Space.com',
  Description: 'The country wants to put boots on the moon before 2030.',
  urlToImage: 'https://cdn.mos.cms.futurecdn.net/aCFHsm36U9owDGYpqTFuN5-1200-80.jpeg',
};

let author = 'Carl Sagan';

const generatedArticleData = {
  article_id: 4,
  Title: 'A Tumultuous Encounter at O.C. Fair: The Ballad of MGK and Megan Fox',
  Description: 'A scene of tumult and strife unfolded at the Orange County Fair as rapper Machine Gun Kelly, together with his betrothed, the fair Megan Fox, their loyal protector, and a purported assailant, engaged in a fray that found its way into the lens of the captured moving pictures on Thursday. The fracas took place in the vicinity of an amusement park ride, adding to the commotion that echoed through the fairground.',
  BlogPost: `Lo! As the sun dipped 'neath the horizon, casting its warm glow upon the merry revelers who sought delight in the Orange County Fair, a tale of tumult and disorder began to unfurl. The protagonists of our narrative, the famed rapper Machine Gun Kelly and the fair Megan Fox, known for her allure and beauty, found themselves entangled in a curious altercation.\n\nIn the company of their loyal sentinel, the valiant bodyguard, the pair wandered amidst the fair's mirth and gaiety, when, lo and behold, a miscreant, described as an attacker, did approach them with malevolence in his heart. A dispute, fierce and passionate, ensued, with the fair Megan Fox standing by her beloved, and the bodyguard ever-vigilant to protect those in his charge.\n\nUnbeknownst to the brawlers, the eyes of the modern age were upon them, for a device that traps moving images did capture the strife, preserving it for posterity. The scuffle, like a tempest that threatens to topple the grandest of oaks, unfolded near an amusement park ride, where merriment and excitement usually reside.\n\nThe echoes of the encounter resounded through the fairground, drawing both awe and consternation from those who bore witness. The news spread like wildfire, reaching the ears of people near and far, sparking discussions and debates among both commoners and gentry.\n\nYet, as with all tales of tumult and woe, there comes a moment of reprieve. As the fair's lights flickered, and the moon rose to take its place in the starry firmament, a semblance of calm returned. The protagonists, MGK and Megan Fox, withdrew from the fray, the bodyguard standing resolute, and the alleged attacker, whose motives may forever remain shrouded in mystery, vanished into the night.\n\nWhat prompted this clash? Whence came the hostility that beset the fair's merrymakers? Alas, dear readers, many questions persist, and answers may be elusive. For now, we are left with the moving pictures that shall etch this event into the annals of the present age.\n\nThus, let us reflect upon this tale of strife, and remember that even amidst the grandest of celebrations, discord may find its way. As the sun rises once more, and the fair resumes its course, we shall carry the memory of this tumultuous encounter, wondering what further twists and turns fate has in store for MGK, Megan Fox, and their loyal bodyguard in the tapestry of life.`, // The long blog post content goes here
  Author: 'William Shakespeare',
  Date: '23rd July 2023',
  urlToImage: 'https://ktla.com/wp-content/uploads/sites/4/2023/07/AP22012863311588.jpg?w=1280',
  category: 'Entertainment',
};

const publishJSON = {
  data: {
    article_id: 12,
    Title: 'Sample Title',
    Description: 'Sample description of the article.',
    BlogPost: 'The content of the blog post goes here.',
    Author: 'Daniel Ford',
    Date: '2023-07-31',
    urlToImage: 'https://example.com/sample-image.jpg',
    category: 'Science',
  },
};

const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

console.log(formattedDate);

// Function to make the API call and fetch data
function fetchDataFromAPI(category) {
  const url = `${document.location.origin}/api/admin/search/${category}`;
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error fetching data:', error);
      return [];
    });
}

// Function to render the data using Handlebars
function renderData(data) {
  console.log(data);
  const parent = document.getElementById('articles'); 

  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }

  const { length } = data;

  for (let x = 0; x < length; x += 1) {
    const obj = data[x];
    const div = document.createElement('div');
    div.setAttribute('class', 'article');
    const title = document.createElement('h2');
    title.innerText = obj.title;
    div.append(title);

    const description = document.createElement('p');
    description.innerText = obj.description;
    div.append(description);

    const image = document.createElement('img');
    image.setAttribute('src', obj.urlToImage);
    div.append(image);

    parent.append(div);
  }
}

// Function to handle tab click event
function onTabClick(category) {
  selectedCategory = category; // Update selected category
  console.log(category);
  sourceArticleJSON.category = category;
  fetchDataFromAPI(selectedCategory)
    .then(data => renderData(data))
    .catch(error => console.error('Error:', error));
}

// Entry point
document.addEventListener('DOMContentLoaded', () => {
  // Set up the tab click event
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-category');
      onTabClick(category);
    });
  });

  // Trigger the initial fetch and render using the default selected category (science)
  onTabClick(selectedCategory);
});

document.addEventListener('DOMContentLoaded', function () {
  // Add click event listener to articles
  const articles = document.querySelectorAll('.article');
  articles.forEach(article => {
    article.addEventListener('click', function () {
      // Remove 'selected' class from all articles
      articles.forEach(article => article.classList.remove('selected'));
      // Add 'selected' class to the clicked article
      article.classList.add('selected');
    });
  });

  // Attach click event listener to the dynamic content container '.articles'
  const articlesContainer = document.querySelector('#articles');
  articlesContainer.addEventListener('click', function (event) {
    // Check if the clicked element is an article
    if (event.target.classList.contains('article')) {
      // Remove 'selected' class from all articles except the clicked one
      articles.forEach(article => {
        if (article !== event.target) {
          article.classList.remove('selected');
        }
      });

      // Add 'selected' class to the clicked article
      event.target.classList.add('selected');

      // Get the index of the clicked article
      const index = Array.from(articles).indexOf(event.target);
      console.log(index);

      // Log the text values of the elements within the clicked article
      const articleTitle = event.target.querySelector('h2').textContent;
      const articleDescription = event.target.querySelector('p').textContent;
      const articleImageSrc = event.target.querySelector('img').getAttribute('src');

      sourceArticleJSON.Title = articleTitle;
      sourceArticleJSON.Description = articleDescription;
      sourceArticleJSON.urlToImage = articleImageSrc;

      console.log('Updated sourceArticleJSON:', sourceArticleJSON);
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const generateBtn = document.querySelector('.btn-generate');
  const publishBtn = document.querySelector('.btn-publish');

  generateBtn.addEventListener('click', async function () {
    const btn = this;

    btn.classList.add('btn-progress');
    setTimeout(function () {
      btn.classList.add('btn-fill');
    }, 1100);

    setTimeout(function () {
      btn.classList.remove('btn-fill');
    }, 4100);

    setTimeout(function () {
      btn.classList.add('btn-complete');
    }, 4100);

    // Call the renderGPTarticle function here
    await renderGPTarticle();
  });

  publishBtn.addEventListener('click', async function () {
    const btn = this;

    btn.classList.add('btn-progress');
    setTimeout(function () {
      btn.classList.add('btn-fill');
    }, 500);

    setTimeout(function () {
      btn.classList.remove('btn-fill');
    }, 4100);

    setTimeout(function () {
      btn.classList.add('btn-complete');
    }, 4100);

    // Call the renderGPTarticle function here
    await renderGPTarticle();

    // Call the saveGPTData function here
    await saveGPTData();
  });
});

async function generateArticle() {
  const url = `${document.location.origin}/api/admin/generate-article`;

  // Assuming sourceArticleJSON and author are global variables
  const { Title, Description } = sourceArticleJSON;

  const requestBody = {
    Title,
    Description,
    author
  };
  console.log(`request body: ${requestBody[0]}`);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  };

  try {
    console.log('Sending POST request:', url);
    console.log('Request body:', requestBody);

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    console.log(`responseData ${responseData.Author}`);
    console.log(`responseData ${responseData.author}`);

    generatedArticleData.Author = responseData.author;
    generatedArticleData.BlogPost = responseData.blogPost;
    generatedArticleData.Description = responseData.description;
    generatedArticleData.Title = responseData.title;
    generatedArticleData.category = sourceArticleJSON.category;
    generatedArticleData.urlToImage = sourceArticleJSON.urlToImage;

    return responseData; // You can return the JSON data if needed
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function renderGPTarticle() {
  try {
    const generatedArticleData = await generateArticle();
    console.log(generatedArticleData.Title);
    console.log(generatedArticleData.title);

    document.querySelector('.article-title').textContent = generatedArticleData.title;
    document.querySelector('.article-description').textContent = generatedArticleData.description;
    document.querySelector('.article-author').textContent = `Author: ${generatedArticleData.author}`;
    document.querySelector('.article-image').src = sourceArticleJSON.urlToImage;
    document.querySelector('.article-blog-post').innerHTML = generatedArticleData.blogPost;
    document.querySelector('.article-date').textContent = `Date: ${formattedDate}`;
    document.querySelector('.article-category').textContent = `Category: ${sourceArticleJSON.category}`;
  } catch (error) {
    console.error('Error:', error);
    // Handle any errors that may occur during the process
  }
}

function saveGPTData() {
  // Update global values
  publishJSON.data.Title = generatedArticleData.Title;
  publishJSON.data.Description = generatedArticleData.Description;
  publishJSON.data.BlogPost = generatedArticleData.BlogPost;
  publishJSON.data.Author = generatedArticleData.Author;
  publishJSON.data.Date = formattedDate;
  publishJSON.data.urlToImage = generatedArticleData.urlToImage;
  publishJSON.data.category = generatedArticleData.category;
  // Generate a unique article_id
  publishJSON.data.article_id = Date.now();

  // Prepare the data to be sent as a POST request
  const postData = JSON.stringify(publishJSON);
  console.log(`Publish params: ${postData}`);

  // Replace 'your-api-url-here' with the actual URL where you want to send the POST request
  const apiUrl = `${document.location.origin}/api/admin/save-gpt-data`;

  // Send the POST request
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: postData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the response data if needed
      console.log('Data saved successfully:', data);
    })
    .catch(error => {
      // Handle any errors that occurred during the POST request
      console.error('Error saving data:', error);
    });
}
