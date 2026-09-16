import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/app2/',  // <--- ESTO ES LO QUE FALTA O ESTÁ MAL
  plugins: [react(), tailwindcss()],
})
