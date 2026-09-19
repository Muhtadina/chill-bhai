const CACHE_NAME = "party-games-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./imposter.html",
  "./detective.html",
  "./manifest.json",

  "./fonts/PatrickHand-Regular.ttf",
  "./fonts/PatrickHandSC-Regular.ttf",

  "./icons/logo.svg",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );

  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        return cachedResponse || fetch(event.request);
      })
  );
});