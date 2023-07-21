import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://macdrien.github.io/tournament-manager',
  plugins: [react()],
})
