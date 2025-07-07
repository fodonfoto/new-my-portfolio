import axios from 'axios';

// Exa Answer API Types
export interface ExaAnswerResponse {
  answer: string;
  sources: ExaSource[];
  requestId: string;
  autopromptString?: string;
}

export interface ExaSource {
  id: string;
  url: string;
  title: string;
  score: number;
  publishedDate?: string;
  author?: string;
  text?: string;
}

export interface ExaAnswerOptions {
  query: string;
  numSources?: number;
  includeDomains?: string[];
  excludeDomains?: string[];
  startCrawlDate?: string;
  endCrawlDate?: string;
  startPublishedDate?: string;
  endPublishedDate?: string;
  useAutoprompt?: boolean;
  type?: 'neural' | 'keyword';
  category?: string;
  stream?: boolean;
}

// Legacy types for backward compatibility
export interface ExaSearchResult extends ExaSource {
  highlights?: string[];
  highlightScores?: number[];
}

export interface ExaSearchResponse {
  results: ExaSearchResult[];
  autopromptString?: string;
  requestId: string;
}

class ExaSearchService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_EXA_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_EXA_API_URL || 'https://api.exa.ai';
    
    if (!this.apiKey) {
      console.warn('Exa API key not found. Please set VITE_EXA_API_KEY in your environment variables.');
    }
  }

  async getAnswer(options: ExaAnswerOptions): Promise<ExaAnswerResponse> {
    if (!this.apiKey) {
      throw new Error('Exa API key is required. Please set VITE_EXA_API_KEY in your environment variables.');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}/answer`,
        {
          query: options.query,
          numSources: options.numSources || 5,
          includeDomains: options.includeDomains,
          excludeDomains: options.excludeDomains,
          startCrawlDate: options.startCrawlDate,
          endCrawlDate: options.endCrawlDate,
          startPublishedDate: options.startPublishedDate,
          endPublishedDate: options.endPublishedDate,
          useAutoprompt: options.useAutoprompt ?? true,
          type: options.type || 'neural',
          category: options.category,
          stream: options.stream ?? false,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 seconds timeout
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401) {
          throw new Error('Invalid Exa API key. Please check your VITE_EXA_API_KEY.');
        } else if (status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        } else if (status && status >= 500) {
          throw new Error('Exa API server error. Please try again later.');
        } else {
          throw new Error(`Exa API error: ${error.response?.data?.message || error.message}`);
        }
      }
      throw new Error('Network error. Please check your internet connection.');
    }
  }

  // Legacy method for backward compatibility - now uses Answer API
  async search(options: ExaAnswerOptions): Promise<ExaSearchResponse> {
    const answerResponse = await this.getAnswer(options);
    
    // Convert Answer API response to legacy Search API format
    return {
      results: answerResponse.sources.map(source => ({
        ...source,
        highlights: source.text ? [source.text.substring(0, 200)] : [],
        highlightScores: [source.score],
      })),
      autopromptString: answerResponse.autopromptString,
      requestId: answerResponse.requestId,
    };
  }

  async getAnswerWithSources(query: string, numSources: number = 5): Promise<ExaAnswerResponse> {
    return this.getAnswer({
      query,
      numSources,
      useAutoprompt: true,
      type: 'neural',
    });
  }

  async getRecentAnswer(query: string, days: number = 7): Promise<ExaAnswerResponse> {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - days);

    return this.getAnswer({
      query,
      numSources: 5,
      startPublishedDate: startDate.toISOString().split('T')[0],
      endPublishedDate: endDate.toISOString().split('T')[0],
      useAutoprompt: true,
      type: 'neural',
    });
  }

  // Legacy methods for backward compatibility
  async searchWithSummary(query: string, summaryQuery?: string): Promise<ExaSearchResponse> {
    return this.search({
      query: summaryQuery || query,
      numSources: 5,
      useAutoprompt: true,
    });
  }

  async searchRecent(query: string, days: number = 7): Promise<ExaSearchResponse> {
    const answerResponse = await this.getRecentAnswer(query, days);
    return {
      results: answerResponse.sources.map(source => ({
        ...source,
        highlights: source.text ? [source.text.substring(0, 200)] : [],
        highlightScores: [source.score],
      })),
      autopromptString: answerResponse.autopromptString,
      requestId: answerResponse.requestId,
    };
  }
}

export const exaSearchService = new ExaSearchService();
