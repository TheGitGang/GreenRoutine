import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:5299',
        changeOrigin: true,
        secure: false
      },
      '^/challenges': {
        target: 'http://localhost:5299',
        secure: false
      },
      '^/pingauth': {
        target: 'http://localhost:5299',
        secure: false
      },
      '^/login': {
        target: 'http://localhost:5299',
        secure: false
      },
      '^/logout': {
        target: 'http://localhost:5299',
        secure: false
      },
    }
  }
})
