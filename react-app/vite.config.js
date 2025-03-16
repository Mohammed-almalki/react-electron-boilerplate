import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // Ensures assets use relative paths in production
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets", // Keeps assets in the "dist/assets" folder
  },
})
