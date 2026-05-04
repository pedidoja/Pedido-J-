const cacheName = 'pedido-ja-v1';
const staticAssets = ['./', './index.html', './manifest.json'];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

self.addEventListener('fetch', function(event) {
  // Esse código vazio já é o suficiente para o celular 
  // permitir a instalação do ícone na tela inicial.
});