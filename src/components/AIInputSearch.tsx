"use client";

import { Globe, Send, Loader2, AlertCircle } from "lucide-react";
import { useState, useCallback } from "react";
import { Textarea } from "./ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useAutoResizeTextarea } from "../hooks/use-auto-resize-textarea";
import { exaSearchService, type ExaAnswerResponse } from "../services/exaSearch";
import { AnswerModal } from "./AnswerModal";
import toast from "react-hot-toast";

export default function AIInputSearch() {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 52,
        maxHeight: 200,
    });
    const [showSearch, setShowSearch] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [answerResult, setAnswerResult] = useState<ExaAnswerResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastQuery, setLastQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) {
            toast.error("Please enter a search query");
            return;
        }

        if (!showSearch) {
            toast.error("Please enable search mode first");
            return;
        }

        setIsLoading(true);
        setError(null);
        setLastQuery(query);
        setIsModalOpen(true); // Open modal immediately

        try {
            console.log('Searching for:', query.trim());
            
            // Use fallback method that provides demo response if API fails
            const response = await exaSearchService.getAnswerWithFallback({
                query: query.trim(),
                numSources: 5,
                useAutoprompt: true,
                type: 'neural',
            });

            console.log('Search result:', response);
            setAnswerResult(response);
            toast.success("Answer generated successfully!");
        } catch (err) {
            console.error('Search error:', err);
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            setError(errorMessage);
            setAnswerResult(null);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [showSearch]);

    const handleSubmit = useCallback(async () => {
        if (!value.trim()) return;
        
        await handleSearch(value);
        setValue("");
        adjustHeight(true);
    }, [value, handleSearch, adjustHeight]);

    const handleQuickSearch = useCallback(async (query: string) => {
        setValue(query);
        await handleSearch(query);
        setValue("");
        adjustHeight(true);
    }, [handleSearch, adjustHeight]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setAnswerResult(null);
        setError(null);
        setLastQuery("");
    }, []);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleContainerClick = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div id="ai-answer" className="w-full py-4">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    AI <span className="text-secondary">Answer</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-secondary to-secondary/80 mx-auto mb-4 rounded-full"></div>
                <p className="text-white/70 text-sm max-w-md mx-auto">
                    Get AI-powered answers with sources from across the web
                </p>
            </div>

            {/* Quick Search Suggestions */}
            <div className="max-w-xl mx-auto mb-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    {[
                        "What is Figma dev mode MCP server?",
                        "Best React practices 2025",
                        "How to use TypeScript with React?",
                        "UX design trends 2025"
                    ].map((suggestion) => (
                        <motion.button
                            key={suggestion}
                            onClick={() => handleQuickSearch(suggestion)}
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 text-sm bg-gradient-to-r from-primary/50 to-background/30 hover:from-secondary/20 hover:to-secondary/10 text-white/80 hover:text-white rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-secondary/30 backdrop-blur-sm"
                        >
                            {suggestion}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="relative max-w-xl w-full mx-auto">
                {/* API Key Warning - Only show if no fallback is working */}
                {!import.meta.env.VITE_EXA_API_KEY && (
                    <div className="mb-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <div className="text-yellow-300 text-xs space-y-1">
                            <p>⚠️ Exa API key not configured in production.</p>
                            <p>Please set <code className="bg-yellow-900/50 px-1 rounded">VITE_EXA_API_KEY</code> in your Netlify environment variables.</p>
                            <p>Using demo mode with limited functionality.</p>
                        </div>
                    </div>
                )}

                <div
                    role="textbox"
                    tabIndex={0}
                    aria-label="Search input container"
                    className={cn(
                        "relative flex flex-col rounded-2xl transition-all duration-300 w-full text-left cursor-text shadow-xl",
                        "ring-1 ring-white/10 bg-gradient-to-br from-primary/50 to-background/30 backdrop-blur-sm",
                        isFocused && "ring-2 ring-secondary/50 shadow-secondary/20",
                        isLoading && "ring-2 ring-secondary/70 shadow-secondary/30"
                    )}
                    onClick={handleContainerClick}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleContainerClick();
                        }
                    }}
                >
                    <div className="overflow-y-auto max-h-[200px]">
                        <Textarea
                            id="ai-input-04"
                            value={value}
                            placeholder={
                                isLoading 
                                    ? "Generating answer..." 
                                    : showSearch 
                                        ? "Ask me anything..." 
                                        : "Search disabled - click the globe to enable"
                            }
                            className={cn(
                                "w-full rounded-2xl px-6 py-4 bg-transparent text-white placeholder:text-white/60 resize-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-0 text-base",
                                isLoading && "cursor-wait"
                            )}
                            ref={textareaRef}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            disabled={isLoading || !showSearch}
                            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    if (!isLoading) {
                                        handleSubmit();
                                    }
                                }
                            }}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                if (!isLoading) {
                                    setValue(e.target.value);
                                    adjustHeight();
                                }
                            }}
                        />
                    </div>

                    <div className="h-14 bg-transparent rounded-b-2xl">
                        <div className="absolute left-4 bottom-4 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowSearch(!showSearch);
                                    if (!showSearch) {
                                        handleCloseModal();
                                    }
                                }}
                                className={cn(
                                    "rounded-full transition-all flex items-center gap-2 px-3 py-2 border h-10 cursor-pointer backdrop-blur-sm",
                                    showSearch
                                        ? "bg-gradient-to-r from-secondary/20 to-secondary/10 border-secondary/50 text-white shadow-lg"
                                        : "bg-white/10 border-white/20 text-white/70 hover:text-white hover:bg-white/20"
                                )}
                            >
                                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                                    <motion.div
                                        animate={{
                                            rotate: showSearch ? 180 : 0,
                                            scale: showSearch ? 1.1 : 1,
                                        }}
                                        whileHover={{
                                            rotate: showSearch ? 180 : 15,
                                            scale: 1.1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 10,
                                            },
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 25,
                                        }}
                                    >
                                        <Globe
                                            className={cn(
                                                "w-4 h-4 text-white",
                                                showSearch && "text-secondary"
                                            )}
                                        />
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {showSearch && (
                                        <motion.span
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{
                                                width: "auto",
                                                opacity: 1,
                                            }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-sm overflow-hidden whitespace-nowrap text-white shrink-0"
                                        >
                                            Answer
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                        <div className="absolute right-4 bottom-4">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={isLoading || !value.trim() || !showSearch}
                                className={cn(
                                    "rounded-xl p-3 transition-all duration-200 flex items-center justify-center min-w-[48px] shadow-lg",
                                    value && showSearch && !isLoading
                                        ? "bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-white transform hover:scale-105"
                                        : "bg-white/10 text-white/50 cursor-not-allowed",
                                    isLoading && "bg-gradient-to-r from-secondary/50 to-secondary/30 cursor-wait animate-pulse"
                                )}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Answer Modal */}
            <AnswerModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                answer={answerResult}
                isLoading={isLoading}
                error={error}
                query={lastQuery}
            />
        </div>
    );
}
