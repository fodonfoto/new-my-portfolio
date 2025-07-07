# Exa Answer API Setup Guide

## 🔑 Getting Your Exa API Key

1. **Sign up for Exa AI**
   - Visit [https://exa.ai](https://exa.ai)
   - Create an account or sign in
   - Navigate to your dashboard

2. **Generate API Key**
   - Go to API Keys section
   - Click "Create New API Key"
   - Copy your API key (keep it secure!)

## ⚙️ Configuration

1. **Create Environment File**
   ```bash
   # Create .env.local in your project root
   touch .env.local
   ```

2. **Add Your API Key**
   ```env
   # Add this to your .env.local file
   VITE_EXA_API_KEY=your_actual_api_key_here
   VITE_EXA_API_URL=https://api.exa.ai
   ```

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## 🚀 Features

### AI-Powered Answers
- Get comprehensive answers instead of just search results
- AI synthesizes information from multiple sources
- Includes source citations for verification
- Natural language responses

### Answer Features
- **Direct Answers**: Get straight answers to your questions
- **Source Citations**: See where the information comes from
- **Real-time Processing**: Fast AI-powered responses
- **Error Handling**: Comprehensive error messages and fallbacks

### Query Types
- **Questions**: "What is Figma dev mode?"
- **How-to**: "How to use TypeScript with React?"
- **Comparisons**: "React vs Vue performance"
- **Explanations**: "Explain machine learning concepts"

## 🎯 Usage Examples

### Basic Answer
```typescript
const answer = await exaSearchService.getAnswer({
  query: "What is Figma dev mode MCP server?",
  numSources: 5,
  useAutoprompt: true
});
```

### Recent Information
```typescript
const recentAnswer = await exaSearchService.getRecentAnswer(
  "Latest AI developments", 
  7 // last 7 days
);
```

### Answer with Sources
```typescript
const answerWithSources = await exaSearchService.getAnswerWithSources(
  "Best React practices 2024",
  8 // number of sources
);
```

## 🔧 API Limits

- **Free Tier**: 1,000 requests per month
- **Pro Tier**: 10,000 requests per month
- **Enterprise**: Custom limits

## 🛠️ Troubleshooting

### Common Issues

1. **"API key not found" error**
   - Check if `.env.local` exists
   - Verify `VITE_EXA_API_KEY` is set correctly
   - Restart development server

2. **"Invalid API key" error**
   - Verify your API key is correct
   - Check if your Exa account is active
   - Ensure no extra spaces in the key

3. **"Rate limit exceeded" error**
   - You've hit your monthly limit
   - Upgrade your Exa plan
   - Wait for the next billing cycle

4. **Network errors**
   - Check your internet connection
   - Verify Exa API status
   - Try again after a few minutes

### Debug Mode
Enable debug logging by adding to your `.env.local`:
```env
VITE_DEBUG_EXA=true
```

## 📚 API Documentation

For detailed API documentation, visit:
- [Exa Answer API Docs](https://docs.exa.ai/reference/answer)
- [Answer Parameters](https://docs.exa.ai/reference/answer-parameters)
- [Response Format](https://docs.exa.ai/reference/answer-response)

## 🔒 Security Notes

- Never commit your API key to version control
- Use environment variables for API keys
- Rotate your API keys regularly
- Monitor your API usage

## 💡 Tips for Better Answers

1. **Ask Clear Questions**: Be specific about what you want to know
2. **Use Natural Language**: Ask questions as you would to a human
3. **Be Specific**: More specific questions yield better answers
4. **Use Context**: Provide context for better understanding
5. **Check Sources**: Always verify information from the provided sources

## 🆚 Answer API vs Search API

### Answer API (Current)
- ✅ Direct answers to questions
- ✅ AI-synthesized responses
- ✅ Source citations included
- ✅ Better for Q&A scenarios
- ✅ More conversational

### Search API (Previous)
- ❌ Raw search results only
- ❌ No answer synthesis
- ❌ User must read through results
- ❌ Better for research/browsing
- ❌ Less conversational

The Answer API is perfect for getting direct answers to specific questions, while the Search API is better for exploratory research.
