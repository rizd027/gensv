import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
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
        },
        '/api/groq': {
          target: 'https://api.groq.com',
          changeOrigin: true,
          rewrite: (path) => '/openai/v1/chat/completions',
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              const auth = req.headers.authorization;
              if (!auth || auth.trim() === 'Bearer') {
                const key = env.GROQ_API_KEY || '';
                if (key) {
                  proxyReq.setHeader('Authorization', `Bearer ${key}`);
                }
              }
            });
            proxy.on('proxyRes', (proxyRes, req, res) => {
              proxyRes.headers['access-control-expose-headers'] = 
                'x-ratelimit-limit-tokens, x-ratelimit-remaining-tokens, x-ratelimit-limit-requests, x-ratelimit-remaining-requests, x-ratelimit-reset-tokens, x-ratelimit-reset-requests';
            });
          }
        },
        '/api/openrouter': {
          target: 'https://openrouter.ai',
          changeOrigin: true,
          rewrite: (path) => '/api/v1/chat/completions',
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              const auth = req.headers.authorization;
              if (!auth || auth.trim() === 'Bearer') {
                const key = env.OPENROUTER_API_KEY || '';
                if (key) {
                  proxyReq.setHeader('Authorization', `Bearer ${key}`);
                }
              }
            });
          }
        },
        '/api/openrouter-key': {
          target: 'https://openrouter.ai',
          changeOrigin: true,
          rewrite: (path) => '/api/v1/key',
          configure: (proxy, options) => {
            proxy.on('proxyReq', (proxyReq, req, res) => {
              const auth = req.headers.authorization;
              if (!auth || auth.trim() === 'Bearer') {
                const key = env.OPENROUTER_API_KEY || '';
                if (key) {
                  proxyReq.setHeader('Authorization', `Bearer ${key}`);
                }
              }
            });
          }
        }
      }
    }
  };
});
