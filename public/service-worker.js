const CACHE_NAME = 'histopathology-lab-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/home.html',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    // Add more assets to cache if needed
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache assets during install', error);
            })
    );
});

self.addEventListener('fetch', event => {
    if (event.request.url.startsWith('https://kit.fontawesome.com/')) {
        return; // Skip caching for Font Awesome due to CORS issue
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return the response from cache
                if (response) {
                    return response;
                }
                return fetch(event.request).catch(error => {
                    console.error('Fetch failed; returning offline page instead.', error);
                    return caches.match('/index.html');
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
