// Minimal Service Worker to satisfy registration and prevent 404
// This replaces the caching logic to avoid development issues
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // No-op: pass through all requests to the network
});
