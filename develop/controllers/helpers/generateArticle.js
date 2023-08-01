const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function runCompletion(title, description, author) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Can you rewrite this title <${title}> and this description <${description}> and make up a blog post in the style of ${author}? Can you return it as a json with these fields; title, description, author, blogPost? Just the json response nothing else. Please make all special characters json compliant`,
    max_tokens: 2000,
  });

  const post = response.data.choices[0].text;
  console.log(post);

  try {
    // Extract the relevant information from the post using regular expressions
    const titleMatch = post.match(/"title":\s*"(.*?)"/);
    const descriptionMatch = post.match(/"description":\s*"(.*?)"/);
    const authorMatch = post.match(/"author":\s*"(.*?)"/);
    const blogPostMatch = post.match(/"blogPost":\s*"(.*?)"/);

    // Construct the JSON object
    const jsonObject = {
      title: titleMatch ? titleMatch[1] : '',
      description: descriptionMatch ? descriptionMatch[1] : '',
      author: authorMatch ? authorMatch[1] : '',
      blogPost: blogPostMatch ? blogPostMatch[1] : '',
    };

    console.log(jsonObject);

    return jsonObject;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
}

module.exports = {
  runCompletion,
};
