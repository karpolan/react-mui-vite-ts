import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [react(), tsConfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    environment: 'jsdom',
    include: ['**/*.test.*', '**/*.spec.*'],
    globals: true,
    setupFiles: ['./setup-tests.ts'],
  },
});
