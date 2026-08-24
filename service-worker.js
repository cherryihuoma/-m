/*
 * Îæm Service Worker
 * © 2026 Îæm / Cherychoicy Classic Communication
 *
 * Strategy:
 *  - Core shell (HTML, CSS, JS, fonts) → Cache First
 *  - Order tracking API (Google Sheets) → Network First, fallback to offline message
 *  - Product images → Cache First with network fallback
 *  - Everything else → Network First
 */

const CACHE_NAME   = 'iaem-v1';
const OFFLINE_PAGE = '/offline.html';

// Files to cache immediately on install (only files that actually exist)
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/products.js',
  '/offline.html',
  '/manifest.json',
  '/images/favicon.png',
  '/images/icon-192.png',
  '/images/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Syne:wght@400;500;700;800&family=DM+Mono:ital,wght@0,300;1,300&display=swap'
];

// ── INSTALL — cache core assets ─────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Îæm SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[Îæm SW] Install error:', err))
  );
});

// ── ACTIVATE — clean up old caches ──────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[Îæm SW] Removing old cache:', key);
            return caches.delete(key);
          })
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH — serve from cache or network ─────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. Google Sheets API calls → Network First
  //    If offline, return a JSON error the tracking page can handle
  if (url.hostname.includes('script.google.com') ||
      url.hostname.includes('googleapis.com')) {
    event.respondWith(
      fetch(request)
        .catch(() => new Response(
          JSON.stringify({
            error: true,
            message: 'You appear to be offline. Order tracking requires an internet connection.'
          }),
          {
            headers: { 'Content-Type': 'application/json' },
            status: 503
          }
        ))
    );
    return;
  }

  // 2. External fonts → Cache First
  if (url.hostname.includes('fonts.googleapis.com') ||
      url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.match(request)
        .then(cached => cached || fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }))
    );
    return;
  }

  // 3. Product images → Cache First, network fallback
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) return cached;
          return fetch(request)
            .then(response => {
              if (response.ok) {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
              }
              return response;
            })
            .catch(() => {
              return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            });
        })
    );
    return;
  }

  // 4. Core HTML/CSS/JS → Cache First, network fallback, offline page last
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) return cached;

        return fetch(request)
          .then(response => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
            }
            return response;
          })
          .catch(() => {
            if (request.mode === 'navigate') {
              return caches.match(OFFLINE_PAGE);
            }
          });
      })
  );
});