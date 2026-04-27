import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { transformWithOxc } from 'vite'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    {
        name: 'treat-js-as-jsx',
        enforce: 'pre',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;{
            return transformWithOxc(code, id, { 
                lang: 'jsx',
                jsx: { runtime: 'automatic' }
            });
          }
        }
    },
    svgr(),
    react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  }
})