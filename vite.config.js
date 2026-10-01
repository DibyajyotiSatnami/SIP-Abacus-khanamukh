import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works on GitHub Pages (served from /SIP-Abacus-khanamukh/) or any host.
  base: './',
  plugins: [react()],
})
