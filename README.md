# GNews.js Client

A simple JavaScript wrapper for the [GNews.io](https://gnews.io) API. This library provides a clean interface for fetching news articles.

## Installation

```bash
npm install gnews-js-client
```

Or with yarn:

```bash
yarn add gnews-js-client
```

## Usage

```javascript
import GNews from 'gnews-js-client';
const gnews = new GNews('YOUR_API_KEY');
```

## API

### Initialize

```javascript
const gnews = new GNews('YOUR_API_KEY', {
  version: 'v4',  // optional, defaults to 'v4'
  maxWait: 10000, // optional, request timeout in ms, defaults to 10000
});
```

### Get Headlines

```javascript
// Get top headlines
gnews.headlines({
  lang: 'en',     // optional, article language
  country: 'us',  // optional, article country
  max: 10,        // optional, number of articles to return
  category: 'technology' // optional, article category
})
.then(response => {
  console.log(`Found ${response.totalArticles} articles`);
  console.log(response.articles);
})
.catch(error => {
  console.error(error);
});
```

### Search Articles

```javascript
// Search for articles
gnews.search({
  q: 'bitcoin',  // required, search query
  lang: 'en',    // optional, article language
  country: 'us', // optional, article country
  max: 10,       // optional, number of articles to return
  in: 'title',   // optional, search in title, description, content
  from: '2025-01-01', // optional, start date
  to: '2025-12-31',   // optional, end date
  sortby: 'relevance' // optional, sort by relevance, date, or publish-time
})
.then(response => {
  console.log(`Found ${response.totalArticles} articles`);
  console.log(response.articles);
})
.catch(error => {
  console.error(error);
});
```

## Response Format

All API methods return promises that resolve to objects with the following structure:

```javascript
{
  totalArticles: 123,
  articles: [
    {
      title: "Article title",
      description: "Article description",
      content: "Article content...",
      url: "https://article-source.com/article",
      image: "https://article-source.com/image.jpg",
      publishedAt: "2025-01-01T12:00:00Z",
      source: {
        name: "Source Name",
        url: "https://source-website.com"
      }
    },
    // More articles...
  ]
}
```

## Error Handling

The library throws errors in the following cases:
- Missing API key during initialization
- Network errors
- API request timeouts
- API error responses

Example error handling:

```javascript
gnews.headlines()
  .then(response => {
    // Handle successful response
  })
  .catch(error => {
    console.error('Error fetching headlines:', error.message);
  });
```

## License

MIT