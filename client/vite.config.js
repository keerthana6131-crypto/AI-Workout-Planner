import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy all /user and /api requests to the Express backend
      '/user': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
