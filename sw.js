const CACHE_NAME = 'vortex-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request).then(netRes => {
        return caches.open(CACHE_NAME).then(cache => {
          // Hanya simpan file game ke cache saat pertama kali dibuka
          if (e.request.url.includes('/games/')) {
            cache.put(e.request, netRes.clone());
          }
          return netRes;
        });
      });
    })
  );
});
