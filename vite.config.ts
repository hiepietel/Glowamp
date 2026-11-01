import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Spotify only accepts 127.0.0.1 (not "localhost") as a redirect address.
const server = { host: '127.0.0.1', port: 8888, strictPort: true };

export default defineConfig(({ command }) => ({
  // GitHub Pages serves the site from /Glowamp/ (case-sensitive); local dev stays at /.
  base: command === 'build' ? '/Glowamp/' : '/',
  plugins: [react(), tailwindcss()],
  server,
  preview: server,
}));
