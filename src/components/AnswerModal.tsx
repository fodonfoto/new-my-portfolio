import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, User, BookOpen, Link, Loader2, Sparkles, Globe, Copy, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ExaAnswerResponse } from '../services/exaSearch';

interface AnswerModalProps {
  isOpen: boolean;
  onClose: () => void;
  answer: ExaAnswerResponse | null;
  isLoading: boolean;
  error: string | null;
  query: string;
}

export function AnswerModal({ isOpen, onClose, answer, isLoading, error, query }: AnswerModalProps) {
  const [copiedSource, setCopiedSource] = useState<string | null>(null);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const copyToClipboard = async (text: string, sourceId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSource(sourceId);
      setTimeout(() => setCopiedSource(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
          className="bg-gradient-to-br from-primary/95 to-background/95 backdrop-blur-xl rounded-3xl border border-white/10 w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl shadow-black/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/80 to-background/80 backdrop-blur-sm">
            <div className="flex items-center justify-between p-8 pb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-primary animate-pulse"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    AI Answer
                  </h2>
                  {query && (
                    <p className="text-white/70 text-sm mt-1 font-medium">
                      "{query}"
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                className="group p-3 rounded-2xl bg-white/5 hover:bg-secondary/20 transition-all duration-200 border border-white/10 hover:border-secondary/50"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-secondary transition-colors" />
              </button>
            </div>
            
            {/* Gradient line */}
            <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-secondary to-secondary/80 flex items-center justify-center mb-6 shadow-lg">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary to-secondary/80 animate-ping opacity-20"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Generating Answer</h3>
                <p className="text-white/70 text-center max-w-md">
                  Our AI is analyzing multiple sources to provide you with the most comprehensive answer...
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-secondary/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-secondary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-8">
                <div className="bg-gradient-to-r from-red-500/10 to-red-400/10 border border-red-500/20 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-red-400 mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                      <X className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-lg">Something went wrong</span>
                  </div>
                  <p className="text-red-300/90 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            {answer && !isLoading && !error && (
              <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                {/* Main Answer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-primary/50 to-background/30 rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Answer</h3>
                    </div>
                    
                    <div className="prose prose-lg prose-invert max-w-none">
                      <div className="text-white leading-relaxed text-lg font-medium whitespace-pre-wrap tracking-wide">
                        {answer.answer.split('\n').map((paragraph, index) => (
                          <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="mb-4 last:mb-0"
                          >
                            {paragraph}
                          </motion.p>
                        ))}
                      </div>
                    </div>

                    {answer.autopromptString && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 pt-6 border-t border-white/10"
                      >
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Sparkles className="w-4 h-4 text-secondary" />
                          <span className="font-medium">Enhanced query:</span>
                          <span className="italic">{answer.autopromptString}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Sources */}
                {answer.sources && answer.sources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center">
                        <Link className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        Sources ({answer.sources.length})
                      </h4>
                    </div>
                    
                    <div className="grid gap-4">
                      {answer.sources.map((source, index) => (
                        <motion.div
                          key={source.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="group relative bg-gradient-to-br from-primary/40 to-background/20 rounded-2xl p-6 border border-white/10 hover:border-secondary/30 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-secondary/5"
                        >
                          {/* Source Number */}
                          <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary/80 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                            {index + 1}
                          </div>

                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group-hover:text-secondary transition-colors"
                              >
                                <h5 className="font-bold text-white group-hover:text-secondary transition-colors text-lg mb-3 line-clamp-2 leading-tight">
                                  {source.title}
                                </h5>
                              </a>
                              
                              {source.text && (
                                <p className="text-white/70 text-sm line-clamp-3 mb-4 leading-relaxed">
                                  {source.text.length > 200 
                                    ? `${source.text.substring(0, 200)}...` 
                                    : source.text
                                  }
                                </p>
                              )}

                              <div className="flex items-center gap-4 text-xs text-white/50">
                                {source.author && (
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-3 h-3" />
                                    <span>{source.author}</span>
                                  </div>
                                )}
                                {source.publishedDate && (
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(source.publishedDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5">
                                  <Globe className="w-3 h-3" />
                                  <span>Relevance: {(source.score * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => copyToClipboard(source.url, source.id)}
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-secondary/20 transition-colors border border-white/10 hover:border-secondary/30"
                                title="Copy URL"
                              >
                                {copiedSource === source.id ? (
                                  <Check className="w-4 h-4 text-secondary" />
                                ) : (
                                  <Copy className="w-4 h-4 text-white/70 hover:text-secondary transition-colors" />
                                )}
                              </button>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2.5 rounded-xl bg-white/5 hover:bg-secondary/20 transition-colors border border-white/10 hover:border-secondary/30"
                              >
                                <ExternalLink className="w-4 h-4 text-white/70 hover:text-secondary transition-colors" />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}


              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative bg-gradient-to-r from-primary/80 to-background/80 backdrop-blur-sm">
            <div className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
            <div className="p-3 sm:p-4 flex justify-end">
              <button
                onClick={() => answer?.answer && copyToClipboard(answer.answer, 'answer')}
                className="p-2.5 rounded-full bg-white/5 hover:bg-secondary/20 transition-colors border border-white/10 hover:border-secondary/30"
                aria-label="Copy answer to clipboard"
                title="Copy answer"
              >
                {copiedSource === 'answer' ? (
                  <Check className="w-5 h-5 text-secondary" />
                ) : (
                  <Copy className="w-5 h-5 text-white/70 hover:text-secondary transition-colors" />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
