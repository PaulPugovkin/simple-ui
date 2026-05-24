import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
  resolve: {
    alias: {
      '@simpleui/core': resolve(__dirname, '../../packages/core/src'),
      '@simpleui/core/src/styles': resolve(__dirname, '../../packages/core/src/styles'),
    },
  },
});
