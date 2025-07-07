import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <div className="min-h-screen bg-background text-foreground">
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'hsl(0, 0%, 7%)',
            color: 'hsl(0, 0%, 100%)',
            border: '1px solid hsl(0, 0%, 14.9%)',
            borderRadius: '0.5rem',
          },
        }}
      />
    </div>
  </React.StrictMode>
);
