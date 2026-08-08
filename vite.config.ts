import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { BACKEND_URLS, ACTIVE_BACKEND } from './src/api/backends.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Local dev only: forwards the app's relative "/api" and "/custom/*"
    // calls to whichever backend is selected in src/api/backends.ts — that
    // one file is the single place to change to switch backends. Requests
    // stay same-origin from the browser's point of view (it only ever
    // talks to this dev server), so this is also what avoids CORS.
    //
    // "/takeposnew" and "/takepos" are POS's own legacy, session-cookie-based
    // endpoints (src/pos/features/tables|reports|cart/services/*.php calls) —
    // they need the same same-origin treatment as /api, or the DOLSESSID
    // cookie Dolibarr sets on them never gets sent back.
    proxy: {
      '/api': { target: BACKEND_URLS[ACTIVE_BACKEND], changeOrigin: true },
      '/custom': { target: BACKEND_URLS[ACTIVE_BACKEND], changeOrigin: true },
      '/takeposnew': { target: BACKEND_URLS[ACTIVE_BACKEND], changeOrigin: true },
      '/takepos': { target: BACKEND_URLS[ACTIVE_BACKEND], changeOrigin: true },
    },
  },
})
