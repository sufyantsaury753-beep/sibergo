const CACHE_NAME = "uin-ssc-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./khs.html",
  "./rencana-studi.html",
  "./kehadiran.html",
  "./profil.html",
  "./pembayaran.html",
  "./email-kampus.html",
  "./kalender.html",
  "./berita.html",
  "./scan.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
