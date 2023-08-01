const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(title, description, author) {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Can you rewrite this title <${title}> and this description <${description}> and make up a blog post in the style of ${author}? Can you return it as a json with these fields; title, description, author, blogPost? Just the json response nothing else. Please make all special characters json compliant`,
      max_tokens: 2000,
    });

    const post = response.data.choices[0].text;
    console.log(post);

    // Remove non-printable/control characters
    const cleanText = post.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

    // Extract the JSON object from the `cleanText` using regular expressions
    const jsonObjectString = cleanText.match(/{[^]*}/s)[0];
    const jsonObject = JSON.parse(jsonObjectString);
    console.log(jsonObject);

    return jsonObject;
  } catch (error) {
    console.error('Error parsing JSON:', error);

    // Retry the function call
    return runCompletion(title, description, author);
  }
}

module.exports = {
  runCompletion,
};
