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
  private proxyUrl: string;

  constructor() {
    // Try to get from Vite environment variables (works in both dev and prod)
    this.apiKey = import.meta.env.VITE_EXA_API_KEY || '';
    this.baseUrl = import.meta.env.VITE_EXA_API_URL || 'https://api.exa.ai';
    
    // Use Netlify function proxy in production, direct API in development
    if (import.meta.env.PROD) {
      this.proxyUrl = '/.netlify/functions/exa-proxy';
    } else {
      this.proxyUrl = this.baseUrl;
      // For development, use fallback values if not set
      if (!this.apiKey) {
        this.apiKey = '8c4bb9e7-1c61-4aa4-ad79-7e979fdf9876';
        // Removed console.warn to eliminate alert messages
      }
    }
    
    // Only log in development mode
    if (import.meta.env.DEV) {
      console.log('ExaSearchService initialized:', {
        isDev: import.meta.env.DEV,
        isProd: import.meta.env.PROD,
        proxyUrl: this.proxyUrl,
        hasApiKey: !!this.apiKey
      });
    }
  }

  async getAnswer(options: ExaAnswerOptions): Promise<ExaAnswerResponse> {
    // In production, we don't need API key check since it's handled by the proxy
    if (import.meta.env.DEV && !this.apiKey) {
      throw new Error('Exa API key is required. Please set VITE_EXA_API_KEY in your environment variables.');
    }

    // Retry logic
    const maxRetries = 2;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const requestUrl = import.meta.env.PROD 
          ? this.proxyUrl 
          : `${this.baseUrl}/answer`;
          
        console.log(`Making Exa API request (attempt ${attempt}/${maxRetries}):`, {
          url: requestUrl,
          query: options.query.substring(0, 50) + '...',
          isProduction: import.meta.env.PROD,
          numSources: options.numSources
        });

        const requestBody = {
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
        };

        const requestConfig: any = {
          timeout: 60000, // Increase timeout to 60 seconds
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        };

        // Only add Authorization header in development (direct API call)
        if (import.meta.env.DEV) {
          requestConfig.headers['Authorization'] = `Bearer ${this.apiKey}`;
          requestConfig.headers['X-Requested-With'] = 'XMLHttpRequest';
          requestConfig.withCredentials = false;
          requestConfig.validateStatus = (status: number) => status < 500;
        }

        const response = await axios.post(requestUrl, requestBody, requestConfig);

        console.log('Exa API response received:', {
          status: response.status,
          hasAnswer: !!response.data?.answer,
          answerLength: response.data?.answer?.length || 0,
          sourcesCount: response.data?.sources?.length || 0
        });
        
        // Handle error responses
        if (response.status >= 400) {
          const errorMsg = response.data?.error || response.data?.message || `HTTP ${response.status}`;
          throw new Error(`API returned status ${response.status}: ${errorMsg}`);
        }

        // Validate response structure
        if (!response.data || typeof response.data !== 'object') {
          throw new Error('Invalid response format from API');
        }

        if (!response.data.answer && !response.data.sources) {
          throw new Error('API response missing required fields (answer or sources)');
        }
        
        return response.data;
      } catch (error) {
        lastError = error;
        console.error(`Exa API Error (attempt ${attempt}/${maxRetries}):`, {
          message: error instanceof Error ? error.message : 'Unknown error',
          status: axios.isAxiosError(error) ? error.response?.status : 'N/A',
          url: axios.isAxiosError(error) ? error.config?.url : 'N/A'
        });
        
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          
          // Don't retry on certain errors
          if (status === 401 || status === 403) {
            throw new Error('Invalid API key or insufficient permissions. Please check your configuration.');
          }
          
          if (status === 400) {
            throw new Error(`Bad request: ${error.response?.data?.error || error.response?.data?.message || 'Invalid request parameters'}`);
          }
          
          // Wait before retry (except on last attempt)
          if (attempt < maxRetries && status !== 400) {
            const delay = Math.min(2000 * attempt, 5000); // Progressive delay, max 5s
            console.log(`Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
          }
        }
        
        // If this is the last attempt, break the loop
        if (attempt === maxRetries) {
          break;
        }
      }
    }
    
    // Handle final error after all retries
    if (axios.isAxiosError(lastError)) {
      const status = lastError.response?.status;
      const errorData = lastError.response?.data;
      
      if (lastError.code === 'NETWORK_ERROR' || lastError.message.includes('Network Error')) {
        throw new Error('Unable to connect to the API. Please check your internet connection and try again.');
      } else if (status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.');
      } else if (status && status >= 500) {
        throw new Error('API server error. Please try again later.');
      } else if (errorData?.error) {
        throw new Error(`API Error: ${errorData.error}`);
      } else {
        throw new Error(`Request failed: ${lastError.message}`);
      }
    }
    
    throw new Error(`Failed to get response after ${maxRetries} attempts. Please try again later.`);
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
