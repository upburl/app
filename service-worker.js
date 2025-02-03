self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('app').then((cache) => {
      return cache.addAll(['who.png','who.jpg','user.jpg','uplogo.png','upload.gif','bdone.gif','Bkash.png','as.png','fail.mp3','hack.jpg','index.gif','lock.gif','popups.jpg','ting.mp3','user.html','index1.html','dension.html']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
