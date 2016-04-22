importScripts('/webApp/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('psp').then(function(cache) {
      return cache.addAll([
        '/webApp/index.html',
        '/webApp/psp-logo.jpg'
      ]).then(function() {
        return self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
  
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});