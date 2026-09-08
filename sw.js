/* Taper service worker.
   Precaches the app shell so the home-screen app opens with no network.
   Serves from cache first, then refreshes the cache in the background,
   so an updated version shows up on the next launch. Bump CACHE on each release. */
var CACHE = 'taper-v1';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE)
      .then(function (cache) { return cache.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req, { ignoreSearch: true }).then(function (cached) {
        var refresh = fetch(req).then(function (res) {
          if (res && res.ok && res.type === 'basic') cache.put(req, res.clone());
          return res;
        }).catch(function () { return null; });
        event.waitUntil(refresh);
        if (cached) return cached;
        return refresh.then(function (res) {
          if (res) return res;
          if (req.mode === 'navigate') return cache.match('./index.html');
          return new Response('', { status: 504, statusText: 'Offline' });
        });
      });
    })
  );
});
