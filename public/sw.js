self.addEventListener("install", (event) => {
  // force waiting for now, to ensure the new service worker takes over immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // claim clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // basic passthrough for now, can be enhanced with caching later
  // mostly just need a SW registered for PWA installability check
});
