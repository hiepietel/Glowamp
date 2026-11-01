import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

// Spotify rejects "localhost" as a redirect address; only 127.0.0.1 works.
if (window.location.hostname === 'localhost') {
  window.location.replace(window.location.href.replace('//localhost', '//127.0.0.1'));
} else {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
