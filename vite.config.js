import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // relative paths so it works on GitHub Pages
  test: { environment: 'jsdom', setupFiles: './src/setupTests.js', globals: false },
});
