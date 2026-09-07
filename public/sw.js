
const CACHE_NAME = 'nephro-nutrition-v1';
const OFFLINE_URL = '/offline.html';

// Critical files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/offline.html',
  '/manifest.json',
  // Add other critical static assets
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Handle navigation requests
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
            .then((cache) => {
              return cache.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Handle other requests with cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Cache the response for future use
            if (fetchResponse.status === 200) {
              const responseClone = fetchResponse.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return fetchResponse;
          });
      })
      .catch(() => {
        // Return offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
      })
  );
});

// Background sync for data synchronization
self.addEventListener('sync', (event) => {
  if (event.tag === 'nutrition-data-sync') {
    event.waitUntil(syncNutritionData());
  }
});

// Sync nutrition data when back online
async function syncNutritionData() {
  try {
    // Get pending data from IndexedDB
    const pendingData = await getPendingNutritionData();
    
    // Sync with server when online
    for (const data of pendingData) {
      await syncToServer(data);
    }
    
    // Clear pending data after successful sync
    await clearPendingData();
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Placeholder functions for data sync
async function getPendingNutritionData() {
  // Implementation would fetch from IndexedDB
  return [];
}

async function syncToServer(data) {
  // Implementation would sync to backend
  return Promise.resolve();
}

async function clearPendingData() {
  // Implementation would clear IndexedDB
  return Promise.resolve();
}
