import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Configure server for hybrid setup
  server: {
    port: 5173, // Different from AngularJS port
    proxy: {
      // Proxy API requests to backend
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Proxy AngularJS app requests
      '/angular': {
        target: 'http://localhost:9000',
        changeOrigin: true,
      }
    }
  },

  // Build configuration
  build: {
    outDir: 'dist/react',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'react/index.html'),
      },
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'query-vendor': ['@tanstack/react-query']
        }
      }
    }
  },

  // Resolve configuration
  resolve: {
    alias: {
      '@react': path.resolve(__dirname, './react'),
      '@shared': path.resolve(__dirname, './shared')
    }
  }
});