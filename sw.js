const version = "0.6.18";
const cacheName = `clearstreams-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/dmca.txt`
       `/d.txt`,
        `/404.html`,
        `/script.js`,
        `/sw.js`,
        `/css/style.css`,
        `/css/style2.css`,
        `/manifest.json`,
        `/favicon.ico`,
        `/LICENSE.MD`
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
