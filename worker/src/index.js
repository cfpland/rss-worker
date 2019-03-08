import { default as router } from './router';
import { default as RssController } from './controllers/rss-controller';

addEventListener('install', event => {
  console.log('Installing CloudFlare Worker...');
});

addEventListener('activate', event => {
  console.log('CloudFlare Worker now ready to handle fetches!');
});

addEventListener('fetch', event => {
  event.passThroughOnException();

  //This allows you to return your own Response object from your worker
  event.respondWith(route(event));
});

async function responseOrCache(event, router) {
  let cache = caches.default;
  let request = event.request;
  let response = await cache.match(request);

  if (!response) {
    response = await router.route(request);
    event.waitUntil(cache.put(request, response.clone()));
  }

  return response;
}

async function route(event) {

  try {
    // router.on('/', 'OPTIONS', (req) => {
    //     let newHeaders = new Headers(req.request.headers);
    //     newHeaders.set('access-control-allow-origin', '*');
    //     return new Response('', { status: status, statusText: statusText, headers: newHeaders });
    // });
    router.get('/rss/cfps', RssController.cfps);
    router.get('/rss/starting', RssController.starting);
    router.get('/rss/twitter', RssController.twitter);

    return responseOrCache(event, router);

  } catch (ex) {
    console.log(ex);
  }
}
