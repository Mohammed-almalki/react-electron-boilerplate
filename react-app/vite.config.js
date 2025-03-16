import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "./", // Ensures assets use relative paths in production
  build: {
    outDir: "dist",
    emptyOutDir: true,
    assetsDir: "assets", // Keeps assets in the "dist/assets" folder
  },
})
