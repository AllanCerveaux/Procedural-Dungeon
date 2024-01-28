import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [eslint(), tsconfigPaths()],
  resolve: {},
  build: {
    // phaser doesn't accept inlined assets
    assetsInlineLimit: 0
  },
  server: {
    host: process.env.VITE_HOST ? process.env.VITE_HOST : '0.0.0.0',
    port: 3000,
    open: '/'
  }
});
