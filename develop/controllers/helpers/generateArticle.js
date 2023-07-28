const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(title, description, author) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Can you rewrite this title <${title}> and this description <${description}> and write a blog post in the style of ${author}? And make up a blog post based on the title can description? Can you return it as a json with these fields; title, description, author, blogPost? Just a json response nothing else. an actual json file and no control characters`,
    max_tokens: 2000,
  });

  const post = response.data.choices[0].text;
  console.log(post);

  try {
    // const cleanText = post.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
    const jsonObject = JSON.parse(post); // put cleanText back here
    console.log(jsonObject);

    // Write the jsonObject to the "generated_article.json" file
    fs.writeFile('generated_article.json', JSON.stringify(jsonObject, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('JSON object written to generated_article.json');
      }
    });
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }

  // Check the token count of the response
  const tokenCount = response.data.usage.total_tokens;
  console.log('Token count:', tokenCount);
}

module.exports = {
  runCompletion,
};
