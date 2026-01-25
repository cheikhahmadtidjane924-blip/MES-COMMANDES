const CACHE_NAME = 'commandes-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installation du Service Worker et mise en cache des fichiers de base
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Stratégie de réponse : réseau d'abord, sinon cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});