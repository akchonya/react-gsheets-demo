import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/react-gsheets-demo/',  // Changed back to match your repo name
  plugins: [react()],
}) 