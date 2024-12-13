
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('meterlocator-cache').then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './location_create.html',
                './location_find.html',
                './styles.css',
                './manifest.json',
                './icon-192x192.png',
                './icon-512x512.png'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== 'meterlocator-cache') {
                    return caches.delete(key);
                }
            }));
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
