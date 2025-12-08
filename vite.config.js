import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // Use relative paths so the build works on GitHub Pages regardless of repo name
  base: './',
  plugins: [vue()],
})
