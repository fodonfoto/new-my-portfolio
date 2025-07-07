import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Calendar, User, Sparkles } from 'lucide-react';
import type { ExaSearchResult } from '../services/exaSearch';

interface SearchResultsProps {
  results: ExaSearchResult[];
  isLoading: boolean;
  error: string | null;
  query: string;
}

export function SearchResults({ results, isLoading, error, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 space-y-4"
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-primary/50 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-white/10 rounded w-full mb-1"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4"
      >
        <div className="flex items-center gap-2 text-red-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="font-medium">Search Error</span>
        </div>
        <p className="text-red-300 text-sm">{error}</p>
      </motion.div>
    );
  }

  if (results.length === 0 && query) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 bg-white/5 rounded-lg p-6 text-center"
      >
        <Sparkles className="w-8 h-8 text-secondary mx-auto mb-2" />
        <p className="text-white/70">No results found for "{query}"</p>
        <p className="text-white/50 text-sm mt-1">Try different keywords or check your spelling</p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-6 space-y-4"
        >
          <div className="flex items-center gap-2 text-white/70 mb-4">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-sm">Found {results.length} results for "{query}"</span>
          </div>
          
          {results.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary/50 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-white/20 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group-hover:text-secondary transition-colors"
                  >
                    <h3 className="font-medium text-white line-clamp-2 mb-2 group-hover:text-secondary transition-colors">
                      {result.title}
                    </h3>
                  </a>
                  
                  {result.text && (
                    <p className="text-white/70 text-sm line-clamp-3 mb-3">
                      {result.text.length > 200 
                        ? `${result.text.substring(0, 200)}...` 
                        : result.text
                      }
                    </p>
                  )}

                  {result.highlights && result.highlights.length > 0 && (
                    <div className="mb-3">
                      <div className="text-xs text-secondary font-medium mb-1">Key Highlights:</div>
                      <div className="space-y-1">
                        {result.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="text-xs text-white/60 bg-secondary/10 rounded px-2 py-1">
                            "{highlight}"
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-xs text-white/50">
                    {result.author && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{result.author}</span>
                      </div>
                    )}
                    {result.publishedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(result.publishedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <span>Score: {(result.score * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group-hover:bg-secondary/20"
                >
                  <ExternalLink className="w-4 h-4 text-white/70 group-hover:text-secondary transition-colors" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
