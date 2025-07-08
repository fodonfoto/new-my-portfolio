# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases your work, skills, and experience in a clean and professional manner.

## 🚀 Features

- **Responsive Design**: Works on all devices
- **Modern UI**: Clean and professional design with smooth animations
- **AI Answer Modal**: Perplexity-style AI-powered search with Exa API
- **Dark Mode**: Built-in dark theme with custom color scheme
- **Interactive Elements**: Hover effects, smooth scrolling, and more
- **Performance Optimized**: Fast loading and smooth animations

## 🎨 Color Scheme

- Background: `#0b0b0b`
- Primary: `#121212`
- Secondary: `#fa8f21` (Accent color)
- Text: `#ffffff`

## 🛠️ Technologies Used

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Vite](https://vitejs.dev/) - Fast development server and build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons library
- [React Hot Toast](https://react-hot-toast.com/) - Beautiful toast notifications
- [Exa AI](https://exa.ai/) - AI-powered search and answer API

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fodonfoto/new-my-portfolio.git
   cd new-my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your Exa API key
   ```

4. Get your Exa API key:
   - Visit [Exa.ai](https://exa.ai)
   - Sign up and get your API key
   - Add it to `.env.local`:
     ```
     VITE_EXA_API_KEY=your_actual_api_key_here
     ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create a `dist` folder with the production build.

## 📁 Project Structure

```
src/
├── assets/            # Static assets (images, icons, etc.)
├── components/        # Reusable UI components
│   ├── About.tsx      # About section component
│   ├── Contact.tsx    # Contact form component
│   ├── HeaderNav.tsx  # Navigation header
│   ├── Portrait.tsx   # Profile image component
│   ├── SloganInto.tsx # Hero section component
│   ├── Social.tsx     # Social media links
│   ├── AIInputSearch.tsx # AI search input component
│   └── AnswerModal.tsx   # Perplexity-style answer modal
├── services/          # API services
│   └── exaSearch.ts   # Exa AI API integration
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## 🎯 Customization

1. **Update Personal Information**:
   - Update your name, email, and social media links in the respective components.
   - Replace the placeholder image in `src/assets/images/portrait-placeholder.svg` with your own image.

2. **Update Colors**:
   - Modify the color scheme in `tailwind.config.js` and `src/index.css`.

3. **Update Content**:
   - Edit the content in the respective component files to reflect your information.

4. **Configure AI Search**:
   - Get your Exa API key from [Exa.ai](https://exa.ai)
   - Add it to your `.env.local` file
   - See `EXA_SETUP.md` for detailed setup instructions

## 🚀 Deployment

### Environment Variables for Production

When deploying to Netlify, Vercel, or other platforms, make sure to set these environment variables:

```
VITE_EXA_API_KEY=your_exa_api_key_here
VITE_EXA_API_URL=https://api.exa.ai
```

#### Netlify:
1. Go to Site settings → Environment variables
2. Add the variables above
3. Redeploy your site

#### Vercel:
1. Go to Settings → Environment Variables  
2. Add the variables above
3. Redeploy your project

## 🤖 AI Features

- **Perplexity-style Modal**: Beautiful answer display with sources
- **Real-time Search**: AI-powered web search with Exa API
- **Source Citations**: Clickable sources with copy functionality
- **Smooth Animations**: Framer Motion powered interactions
- **Error Handling**: Comprehensive error states and loading indicators

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern portfolio templates
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- AI search powered by [Exa AI](https://exa.ai/)
