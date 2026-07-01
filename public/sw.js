const CACHE_NAME = 'gensv-cache-v1';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/icons.svg',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return fetch('/build-manifest.json')
          .then((res) => {
            if (!res.ok) throw new Error('Manifest not found');
            return res.json();
          })
          .then((assets) => {
            const allAssets = [...PRECACHE_ASSETS, ...assets];
            return cache.addAll(allAssets);
          })
          .catch((err) => {
            console.warn('Could not load build-manifest, caching precache assets only:', err);
            return cache.addAll(PRECACHE_ASSETS);
          });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Skip non-GET and API requests
  if (
    request.method !== 'GET' ||
    url.pathname.includes('/api-groq') ||
    url.hostname.includes('api.groq.com') ||
    url.hostname.includes('openrouter.ai')
  ) {
    return;
  }

  // 2. Navigation requests: Network-First (so they get the fresh app shell online, cached offline)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // 3. Static assets: Cache-First, fallback to Network (and cache dynamically)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Return nothing if offline and not in cache
      });
    })
  );
});
