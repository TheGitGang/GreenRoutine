import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5299',
        changeOrigin: true,
        secure: false
      },
      '^/chall': {
        target: 'http://localhost:5299',
        secure: false
      },
      // '^/pingauth': {
      //   target: 'http://localhost:5299',
      //   secure: false
      // },
      // '^/register': {
      //   target: 'http://localhost:5299',
      //   secure: false
      // },
      // '^/login': {
      //   target: 'http://localhost:5299',
      //   secure: false
      // },
      // '^/logout': {
      //   target: 'http://localhost:5299',
      //   secure: false
      // },
    }
  }
})
