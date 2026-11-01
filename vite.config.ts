import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Spotify akceptuje tylko 127.0.0.1 (nie "localhost") jako adres zwrotny.
const server = { host: '127.0.0.1', port: 8888, strictPort: true };

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server,
  preview: server,
});
