import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'generate-build-manifest',
      closeBundle() {
        const distPath = path.resolve(process.cwd(), 'dist');
        const assetsPath = path.resolve(distPath, 'assets');
        const assets = [];
        
        if (fs.existsSync(assetsPath)) {
          const files = fs.readdirSync(assetsPath);
          files.forEach(file => {
            assets.push(`/assets/${file}`);
          });
        }
        
        fs.writeFileSync(
          path.resolve(distPath, 'build-manifest.json'),
          JSON.stringify(assets, null, 2)
        );
        console.log('Build manifest generated successfully with', assets.length, 'assets');
      }
    }
  ],
  server: {
    proxy: {
      '/api-groq': {
        target: 'https://api.groq.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-groq/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['access-control-expose-headers'] = 
              'x-ratelimit-limit-tokens, x-ratelimit-remaining-tokens, x-ratelimit-limit-requests, x-ratelimit-remaining-requests, x-ratelimit-reset-tokens, x-ratelimit-reset-requests';
          });
        }
      }
    }
  }
})
