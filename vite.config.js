import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { transformWithOxc } from 'vite'

export default defineConfig({
  plugins: [
    {
        name: 'treat-js-as-jsx',
        async transform(code, id) {
          if (!id.match(/src\/.*\.js$/)) return null;{
            return transformWithOxc(code, id, { 
                lang: 'jsx',
                jsx: { runtime: 'automatic' }
            });
          }
        }
    },
    react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
  }
})