const CACHE_NAME = 'seiryuu-v2';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './css/style.css',
    './js/app.js',
    './js/router.js',
    './js/components/Home.js',
    './js/components/Info.js',
    './js/components/Study.js',
    './js/components/Bell.js',
    './data/curriculum.json',
    './assets/kamiza_bg.png',
    './assets/icon-192.png',
    './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('SW: Caching assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((fetchRes) => {
                // Dynamic caching for new requests could go here
                return fetchRes;
            });
        })
    );
});

self.addEventListener('activate', (event) => {
    // Cleanup old caches
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});
