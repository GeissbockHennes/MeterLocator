
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
                'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
