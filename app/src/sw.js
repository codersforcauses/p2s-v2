/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v1').then(cache => cache.addAll([

    ])),
  );
});

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', e => {
  if (!e.data) {
    return;
  }

  switch (e.data) {
    case 'skipWaiting': self.skipWaiting(); break;
    default: break;
  }
});

workbox.clientsClaim();

// The precaching code provided by Workbox.
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
