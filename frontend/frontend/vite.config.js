import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/transaction': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/api/v1/user': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
