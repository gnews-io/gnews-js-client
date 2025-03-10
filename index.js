/**
 * GNews.io API Client Library
 * A simple wrapper for the GNews.io API
 */
class GNews {
  /**
   * Creates a new GNews client
   * @param {string} apiKey - Your GNews.io API key
   * @param {Object} options - Additional configuration options
   * @param {string} options.version - API version (default: 'v4')
   * @param {string} options.maxWait - Maximum time to wait for a response in ms (default: 10000)
   */
  constructor(apiKey, options = {}) {
    if (!apiKey) {
      throw new Error('API key is required');
    }

    this.apiKey = apiKey;
    this.version = options.version || 'v4';
    this.maxWait = options.maxWait || 10000;
    this.baseUrl = `https://gnews.io/api/${this.version}`;
  }

  /**
   * Make a request to the GNews API
   * @private
   * @param {string} endpoint - API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} - Promise resolving to API response
   */
  async _request(endpoint, params = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add API key to all requests
    url.searchParams.append('apikey', this.apiKey);
    
    // Add all other parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, value);
      }
    });

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.maxWait);
      
      const response = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out after ${this.maxWait}ms`);
      }
      throw error;
    }
  }

  /**
   * Get top news headlines
   * @param {Object} params - Query parameters
   * @param {string} params.lang - Article language (e.g., 'en')
   * @param {string} params.country - Article country (e.g., 'us')
   * @param {number} params.max - Maximum number of articles to return
   * @param {string} params.category - News category (top, world, nation, business, technology, entertainment, sports, science, health)
   * @returns {Promise<Object>} - Promise resolving to headlines response
   */
  async headlines(params = {}) {
    return this._request('/top-headlines', params);
  }

  /**
   * Search for news articles
   * @param {Object} params - Query parameters
   * @param {string} params.q - Search query (required)
   * @param {string} params.lang - Article language (e.g., 'en')
   * @param {string} params.country - Article country (e.g., 'us')
   * @param {number} params.max - Maximum number of articles to return
   * @param {string} params.in - Where to search (title, description, content)
   * @param {string} params.nullable - Fields that can be null
   * @param {string} params.from - Start date in 'YYYY-MM-DD' format
   * @param {string} params.to - End date in 'YYYY-MM-DD' format
   * @param {string} params.sortby - Sort articles by (relevance, date, publish-time)
   * @returns {Promise<Object>} - Promise resolving to search response
   */
  async search(params = {}) {
    if (!params.q) {
      throw new Error('Search query (q) is required');
    }
    return this._request('/search', params);
  }
}

// Export for ES modules (modern browsers)
if (typeof window !== 'undefined') {
  window.GNews = GNews;
}

// Export for ES modules (import/export syntax)
module.exports = GNews;