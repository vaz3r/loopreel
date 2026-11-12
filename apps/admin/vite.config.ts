import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@generator': path.resolve(__dirname, '../../packages/generator/src'),
      '@templates': path.resolve(__dirname, '../../packages/generator/templates'),
    },
  },
  server: {
    port: 5175,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, '../..')],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
