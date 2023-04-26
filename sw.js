let staticCache = 'portfolio-v5';
let dynamicCache = "d-app-v5";
let assets = [
    "/",
    "/manifest.json",
    "/assets/icon-192x192.png",
    "/assets/icon-256x256.png",
    "/assets/icon-384x384.png",
    "/assets/icon-512x512.png",
    "/img/about-photo.png",
    "/img/contact.png",
    "/img/photo.png",
    "/img/skills.jpg",
    "/index.html",
    "/css/style.css",
    "/offline.html",
    "/script.js",
];

self.addEventListener("install", async (e) => {
  let cache = await caches.open(staticCache); 
  // console.log('test');
  await cache.addAll(assets);
});

self.addEventListener("activate", async (e) => {
  let cache = await caches.keys();

  await Promise.all( 
    cache 
      .filter(cache_name => cache_name != staticCache) 
      .filter(cache_name => cache_name != dynamicCache)
      .map(cache_data => caches.delete(cache_data)) 
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(checkCache(e.request));
});

async function checkCache (request) {
    const cache = await caches.match(request);
    return cache ?? checkOnline(request);
};

async function checkOnline(request){
  const cache = await caches.open(dynamicCache)

  try{
    const res = await fetch(request)
    await cache.put(request, res.clone())
    return res
  }
  catch(e){
    const cachedRes = await cache.match(request);

    if (cachedRes) {
        return cachedRes;
    } else {
        return caches.match('./offline.html');
    }
  }
}

