import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { initDevErrorCollector } from './utils/devErrorCollector.ts';
import { injectMindMathOklchCssVars } from './utils/oklchApcaPalette.ts';
import {
  installProgressAutoMirror,
  restoreProgressFromIndexedDBIfNeeded,
} from './utils/progressPersistence.ts';

// Initialize global error monitoring and OKLCH/APCA color tokens
initDevErrorCollector();
injectMindMathOklchCssVars();

async function bootstrapApp() {
  // Restore any missing learning progress from IndexedDB before React reads localStorage
  await restoreProgressFromIndexedDBIfNeeded();
  installProgressAutoMirror();

  createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

void bootstrapApp();
