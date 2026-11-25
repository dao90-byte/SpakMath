import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { initDevErrorCollector } from './utils/devErrorCollector.ts';

// Initialize global error monitoring for programming errors (runtime, promise rejections, 404s)
initDevErrorCollector();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

