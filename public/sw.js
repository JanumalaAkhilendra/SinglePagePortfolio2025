// Service Worker (sw.js)
// This template avoids caching partial (206) responses to prevent errors.

self.addEventListener('fetch', event => {
  event.respondWith(networkFirst(event.request));
});

async function networkFirst(request) {
  const cache = await caches.open('dynamic-cache');
  try {
    const response = await fetch(request);
    // Only cache if response is 200 and type is 'basic' (from origin)
    if (response && response.status === 200 && response.type === 'basic') {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await cache.match(request);
    return cachedResponse || Response.error();
  }
}
