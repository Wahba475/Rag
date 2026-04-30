import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind v4: handled as a Vite plugin, not postcss
  ],
  define: {
    // Expose REACT_APP_API_URL so components can use process.env.REACT_APP_API_URL
    'process.env.REACT_APP_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'http://localhost:8000'
    ),
  },
})
