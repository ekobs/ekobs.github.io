importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '1' },
	{ url: '/article.html', revision: '1' },
	{ url: '/articleDel.html', revision: '1' },
	{ url: '/manifest.json', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/api.js', revision: '1' },
	{ url: '/js/cariTeams.js', revision: '1' },
	{ url: '/js/db.js', revision: '1' },
	{ url: '/js/idb.js', revision: '1' },
	{ url: '/js/materialize.js', revision: '1' },
	{ url: '/js/nav.js', revision: '1' },
	{ url: '/js/pesan.js', revision: '1' },
  { url: '/js/regServiceWorker.js', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/deleted.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
  { url: '/icon.png', revision: '1' },
  { url: '/broken.png', revision: '1' },
], {
	ignoreUrlParametersMatching:[/.*/]
}); 

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
	cacheName: 'first-cache',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 265,
        maxEntries: 30,
      }),
    ]
  })
);


/*
workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: 'google-fonts-stylesheets',
	})
)

workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.staleWhileRevalidate({
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 265,
        maxEntries: 30,
      }),
    ]
  })
);
*/


  /*/ Blok Kode Request API Key
  const myHeaders = new Headers();
  myHeaders.append('X-Auth-Token', 'c376496e14554c128121c3545f30cf0a');
  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };*/

/*--------------------------------------------------*/
self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});
