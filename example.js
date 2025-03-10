// Example usage of the GNews API library

// Import the library
const GNews = require('gnews-js-client');

// Create a new instance with your API key
const gnews = new GNews('YOUR_API_KEY');

// Example 1: Get headlines
async function getHeadlines() {
  try {
    const headlines = await gnews.headlines({
      lang: 'en',
      country: 'us',
      max: 5,
      category: 'technology'
    });
    
    console.log('Top Headlines:');
    headlines.articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article.title}`);
      console.log(`   ${article.description}`);
      console.log(`   Source: ${article.source.name} - ${article.publishedAt}`);
      console.log(`   URL: ${article.url}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error fetching headlines:', error.message);
  }
}

// Run the example
getHeadlines();
