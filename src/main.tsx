import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { initDevErrorCollector } from './utils/devErrorCollector.ts';
import { injectMindMathOklchCssVars } from './utils/oklchApcaPalette.ts';

// Initialize global error monitoring and OKLCH/APCA color tokens
initDevErrorCollector();
injectMindMathOklchCssVars();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

