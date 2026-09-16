import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/app2/',
  plugins: [react(), tailwindcss()],
  base: '/app2/', // Importante: debe coincidir con el nombre del repositorio
})
