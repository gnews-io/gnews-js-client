declare class GNews {
  /**
   * Creates a new GNews client
   * @param apiKey - Your GNews.io API key
   * @param options - Additional configuration options
   */
  constructor(
      apiKey: string,
      options?: {
        version?: string;
        maxWait?: number;
      }
  );

  /**
   * Get top news headlines
   * @param params - Query parameters
   */
  headlines(params?: {
    lang?: string;
    country?: string;
    max?: number;
    category?: 'general' | 'world' | 'nation' | 'business' | 'technology' | 'entertainment' | 'sports' | 'science' | 'health';
  }): Promise<GNewsResponse>;

  /**
   * Search for news articles
   * @param q - Search query
   * @param params - Query parameters
   */
  search(q: string, params: {
    lang?: string;
    country?: string;
    max?: number;
    in?: string;
    nullable?: string;
    from?: string;
    to?: string;
    sortby?: 'relevance' | 'date' | 'publish-time';
  }): Promise<GNewsResponse>;
}

export interface GNewsResponse {
  totalArticles: number;
  articles: Article[];
}

export interface Article {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
}

export default GNews;
