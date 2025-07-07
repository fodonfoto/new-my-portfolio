# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and Framer Motion. This portfolio showcases your work, skills, and experience in a clean and professional manner.

## 🚀 Features

- **Responsive Design**: Works on all devices
- **Modern UI**: Clean and professional design with smooth animations
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

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

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
│   └── Social.tsx     # Social media links
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

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by [Bentolio Portfolio Template](https://www.figma.com/community/file/1234567890)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Icons by [Lucide](https://lucide.dev/)
