import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` must match the GitHub repo name for project pages
// (https://<user>.github.io/<repo>/). Change it if the repo is renamed.
export default defineConfig({
  plugins: [react()],
  base: '/Karteikartenprogramm/',
})
