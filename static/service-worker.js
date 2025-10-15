const CACHE_NAME = 'quiz-cache-v2';

const URLS_TO_CACHE = [
  '/',
  '/nivel',
  '/tempo',
  '/jogo',
  '/fim',
  '/static/manifest.json',

  // ===== CSS =====
  '/static/css/pagina_index/index.css',
  '/static/css/iniciar_jogo/iniciar.css',
  '/static/css/pagina_nivel/nivel.css',
  '/static/css/praticar/praticar.css',
  '/static/css/pagina_fim/fim.css',
  '/static/css/pagina_manual/manual.css',
  '/static/css/tempo/tempo.css',

  // ===== JS =====
  '/static/js/index.js',
  '/static/js/iniciar.js',
  '/static/js/manual.js',
  '/static/js/nivel.js',
  '/static/js/praticar.js',

  // ===== Áudio =====
  '/static/audio/audio_alegria.mp3',
  '/static/audio/audio_nivel.mp3',
  '/static/audio/audio_relogio.mp3',
  '/static/audio/audio_vaia.mp3',
  '/static/audio/musica.mp3',

  // ===== Imagens =====
  '/static/imagens/logo.png',
  '/static/imagens/telainicio.png',
  '/static/imagens/telajogo.png',
  '/static/imagens/telafim.png',
  '/static/imagens/telanivel.png',
  '/static/imagens/telatempo.png',
  '/static/imagens/acerto.png',
  '/static/imagens/errado.png'
];

// Instala o service worker e armazena tudo no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('📦 Cache inicial carregado com sucesso!');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa o service worker e remove caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
  console.log('⚡ Novo service worker ativo!');
});

// Intercepta requisições e tenta responder do cache (modo offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se achou no cache → retorna, senão busca online
      return cachedResponse || fetch(event.request).then((response) => {
        // Armazena dinamicamente no cache novas respostas
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      }).catch(() => {
        // Se offline e não achar o recurso → pode retornar uma imagem padrão
        if (event.request.destination === 'image') {
          return caches.match('/static/imagens/logo.png');
        }
      });
    })
  );
});
