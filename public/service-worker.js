const cacheName = 'v1';
const cacheAssets = [
    '/index.html',
    '/home.html',
    '/addregistrarConsultant.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Call Install Event
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.log('Service Worker: Caching Files');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', (e) => {
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
