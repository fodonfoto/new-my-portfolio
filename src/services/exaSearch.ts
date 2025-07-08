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
    // Try to get from Vite environment variables (works in both dev and prod)
    this.apiKey = import.meta.env.VITE_EXA_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_EXA_API_URL || 'https://api.exa.ai';
    
    // For development, use fallback values if not set
    if (import.meta.env.DEV) {
      if (!this.apiKey) {
        this.apiKey = '8c4bb9e7-1c61-4aa4-ad79-7e979fdf9876';
        console.warn('Development: Using fallback API key. For production, set VITE_EXA_API_KEY in Netlify environment variables.');
      }
      
      if (!this.baseUrl) {
        this.baseUrl = 'https://api.exa.ai';
        console.warn('Development: Using fallback API URL. For production, set VITE_EXA_API_URL in Netlify environment variables.');
      }
    }
    
    // For production, throw error if API key is not set
    if (import.meta.env.PROD && !this.apiKey) {
      throw new Error('Exa API key is required in production. Please set VITE_EXA_API_KEY in Netlify environment variables.');
    }
  }

  async getAnswer(options: ExaAnswerOptions): Promise<ExaAnswerResponse> {
    if (!this.apiKey) {
      throw new Error('Exa API key is required. Please set VITE_EXA_API_KEY in your environment variables.');
    }

    try {
      console.log('Making Exa API request:', {
        url: `${this.baseUrl}/answer`,
        query: options.query,
        hasApiKey: !!this.apiKey
      });

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
            'Accept': 'application/json',
          },
          timeout: 30000, // 30 seconds timeout
          withCredentials: false, // Disable credentials for CORS
        }
      );

      console.log('Exa API response received:', response.status);
      return response.data;
    } catch (error) {
      console.error('Exa API Error Details:', error);
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message || error.message;
        
        console.error('Axios Error:', {
          status,
          message,
          url: error.config?.url,
          method: error.config?.method
        });
        
        if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
          throw new Error('Unable to connect to Exa API. This might be due to CORS policy or network restrictions. Please try again later.');
        } else if (status === 401) {
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

  // Mock response for testing when API is not available
  private getMockResponse(query: string): ExaAnswerResponse {
    return {
      answer: `This is a demo response for: "${query}"\n\nThe AI Answer feature uses Exa API to search the web and provide comprehensive answers with sources. In this demo mode, you're seeing a sample response.\n\nKey features:\n• Real-time web search\n• AI-powered answer generation\n• Source citations with relevance scores\n• Multiple perspectives on topics\n\nTo enable full functionality, configure the Exa API key in your environment variables.`,
      sources: [
        {
          id: 'demo-1',
          url: 'https://example.com/comprehensive-guide',
          title: 'Comprehensive Guide: Understanding Your Query',
          score: 0.95,
          publishedDate: new Date().toISOString(),
          author: 'Expert Author',
          text: 'This would contain detailed information relevant to your query, sourced from authoritative websites and recent publications.'
        },
        {
          id: 'demo-2', 
          url: 'https://example.com/latest-insights',
          title: 'Latest Insights and Analysis',
          score: 0.87,
          publishedDate: new Date(Date.now() - 86400000).toISOString(),
          author: 'Research Team',
          text: 'Additional context and analysis that provides different perspectives on the topic you\'re exploring.'
        },
        {
          id: 'demo-3',
          url: 'https://example.com/expert-opinion',
          title: 'Expert Opinion and Best Practices',
          score: 0.82,
          publishedDate: new Date(Date.now() - 172800000).toISOString(),
          author: 'Industry Expert',
          text: 'Professional insights and best practices related to your query, helping you understand the practical applications.'
        }
      ],
      requestId: `demo-${Date.now()}`,
      autopromptString: `Enhanced search: ${query} with comprehensive analysis`
    };
  }

  // Alternative method that falls back to mock data
  async getAnswerWithFallback(options: ExaAnswerOptions): Promise<ExaAnswerResponse> {
    try {
      return await this.getAnswer(options);
    } catch (error) {
      console.warn('API unavailable, using demo response:', error);
      return this.getMockResponse(options.query);
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
