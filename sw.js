'use strict';

/* NEURON — rede primeiro, cache como reserva offline.
   Assim qualquer melhoria chega na próxima abertura,
   e o app continua funcionando sem internet. */

const CACHE = 'neuron-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './content.js',
  './comics.js',
  './comicart.js',
  './circle.js',
  './app.js',
  './manifest.webmanifest',
  './icons/neuron-192.png',
  './icons/neuron-512.png',
  './icons/neuron-maskable-512.png',
  './icons/neuron-180.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // O Círculo é dinâmico: nunca servir posts do cache.
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then((cached) => {
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      }))
  );
});
