import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works from any sub-path (e.g. GitHub Pages).
  base: './',
  // The bilingual text for ~120 plants lives in the main bundle (~210 kB gzipped).
  build: { chunkSizeWarningLimit: 800 },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Medicinal Plant · 药用植物图鉴',
        short_name: 'Medicinal Plant',
        description: 'Medicinal plants of China and Ireland · 中国与爱尔兰药用植物',
        theme_color: '#1f4d3a',
        background_color: '#f6f3ea',
        display: 'standalone',
        start_url: '.',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the app shell; plant photos (~120) are cached as they are viewed.
        globPatterns: ['**/*.{js,css,html,svg,png}'],
        globIgnores: ['images/**'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.includes('/images/'),
            handler: 'CacheFirst',
            options: { cacheName: 'plant-photos', expiration: { maxEntries: 200, maxAgeSeconds: 90 * 24 * 3600 } },
          },
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\//,
            handler: 'CacheFirst',
            options: { cacheName: 'osm-tiles', expiration: { maxEntries: 500, maxAgeSeconds: 30 * 24 * 3600 } },
          },
        ],
      },
    }),
  ],
})
