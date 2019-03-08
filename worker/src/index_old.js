const fetch = require('node-fetch');
const RSS = require('rss');

const cfpEndsSoon = process.env.JSONBIN_CFP_ENDS_SOON_ID;
const confStartsSoon = process.env.JSONBIN_STARTS_SOON_ID;

function getJsonBinConfig(request) {
  const url = new URL(request.url);

  if (url.pathname.endsWith('/rss/cfps')) {
    return {
      type: 'cfps',
      url: 'https://api.jsonbin.io/b/' + cfpEndsSoon + '/latest',
    };
  } else if (url.pathname.endsWith('/rss/starting')) {
    return {
      type: 'starting',
      url: 'https://api.jsonbin.io/b/' + confStartsSoon + '/latest',
    };
  }

  return undefined;
}

function createFeed(targetConfig) {
  return new RSS({
    title: targetConfig.type === 'cfps' ? 'CFPs Ending Soon' : 'Conferences Starting Soon',
    feed_url: targetConfig.url,
    language: 'en',
  });
}

function getItemDescription(result, targetConfig) {
  return targetConfig.type === 'cfps' ?
    '<p>CFPs Due: ' + result.cfpEndDate + '</p>' +
    '<p>Conference Date: ' + result.startDate + '</p>' +
    '<p>Location: ' + result.city + ', ' + result.country + '</p>'
    :
    '<p>Start Date: ' + result.startDate + '</p>' +
    '<p>Location: ' + result.city + ', ' + result.country + '</p>';
}

function generateItemFromResult(result, targetConfig) {
  return {
    title: result.name,
    description: getItemDescription(result, targetConfig),
    categories: [result.category],
    custom_elements: [
      {'eventStartDate': result.startDate},
      {'cfpEndDate': result.cfpEndDate},
      {'location': result.city + ', ' + result.country},
    ],
    url: (targetConfig === 'cfps' && result.cfpUrl) ? result.cfpUrl : result.url,
    date: (targetConfig === 'cfps' && result.cfpEndDate) ? result.cfpEndDate : result.startDate,
  };
}

function getRssFeed(targetConfig) {
  return fetch(targetConfig.url).then(res => res.json()).then(results => {
    const feed = createFeed(targetConfig);

    for (let result of results) {
      feed.item(generateItemFromResult(result, targetConfig));
    }

    return feed.xml();
  });
}

async function getRssResponse(targetUrl) {
  const body = await getRssFeed(targetUrl);
  const response = new Response(body);

  response.headers.set('Cache-Control', 'max-age=7200');
  response.headers.set('Content-Type', 'application/rss+xml');

  return response;
}

async function handleRequest(fe) {
  const request = fe.request;
  const targetConfig = getJsonBinConfig(request);

  if (targetConfig) {
    let cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      response = await getRssResponse(targetConfig);

      fe.waitUntil(cache.put(request, response.clone()))
    }

    return response;
  } else {
    return new Response('Bad Request', { status: 400, statusText: 'Bad Request' });
  }
}

if (typeof addEventListener === 'function') {
  addEventListener('fetch', (fe) => fe.respondWith(handleRequest(fe)));
}
