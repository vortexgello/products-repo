
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/products-repo/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
