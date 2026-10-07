import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the app under /<repo>/. BASE_PATH is set by the deploy
// script; local dev and preview run at the root.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
  cacheDir: 'node_modules/.vite-yoga',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
  // Generated audio and research files change while the app is being
  // developed; a new mp3 must not reload the page mid-lesson.
  server: { port: 5178, watch: { ignored: ['**/public/audio/**', '**/research/**'] } },
})
