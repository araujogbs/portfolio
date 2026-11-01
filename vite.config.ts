import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// O GitHub Pages serve o site em https://araujogbs.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: { sourcemap: false },
});
