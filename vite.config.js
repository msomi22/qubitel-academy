import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: [
        'Chrome >= 61',
        'Safari >= 11'
      ],
      modernPolyfills: true,
      renderLegacyChunks: true
    })
  ],
  server: {
    port: 5173,
    allowedHosts: [
      'cbc.academy.qubitel.net',
      'cx.academy.qubitel.net'
    ]
  },
  build: {
    target: 'es2015',
    cssTarget: 'chrome61',
    cssCodeSplit: true
  },
  esbuild: {
    target: 'es2015'
  }
});
