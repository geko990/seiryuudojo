// CACHE VERSION - Update this to force cache refresh!
const CACHE_VERSION = '0.5.52';
const CACHE_NAME = `seiryuu-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    // CSS
    './css/style.css',
    // Core JS
    './js/app.js',
    './js/config.js',
    './js/router.js',
    // Components
    './js/components/Bell.js',
    './js/components/Exams.js',
    './js/components/Glossary.js',
    './js/components/Home.js',
    './js/components/Info.js',
    './js/components/Settings.js',
    './js/components/Study.js',
    // Data files
    './data/aikido_glossary.json',
    './data/curriculum.json',
    './data/etiquette.json',
    './data/foundations.json',
    './data/posts.json',
    // Assets
    './assets/kamiza_bg.png',
    './assets/icon-192.png',
    './assets/icon-512.png'
];

// Install - cache core assets
self.addEventListener('install', (event) => {
    console.log('SW: Installing version', CACHE_VERSION);
    self.skipWaiting(); // Activate immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('SW: Activating version', CACHE_VERSION);
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) {
                    console.log('SW: Deleting old cache', key);
                    return caches.delete(key);
                }
            })
        )).then(() => self.clients.claim()) // Take control immediately
    );
});

// Listen for skip waiting message from app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Fetch - Network first for JS/CSS, cache first for images
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // For JS and CSS files - always try network first
    if (url.pathname.endsWith('.js') || url.pathname.endsWith('.css')) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // Cache the fresh response
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })
                .catch(() => caches.match(event.request)) // Fallback to cache if offline
        );
        return;
    }

    // For other assets - cache first (images, etc)
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
