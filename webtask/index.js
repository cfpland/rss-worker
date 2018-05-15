const app = (require('express'))();
const fetch = require('node-fetch');
const Webtask = require('webtask-tools');
const RSS = require('rss');

// Converts JSON to RSS
app.get('/cfps', (req, res) => {
  const jsonFeedUrl = 'https://api.jsonbin.io/b/' + req.webtaskContext.secrets.JSONBIN_CFP_ENDS_SOON_ID + '/latest';
  fetch(jsonFeedUrl).then(res => res.json()).then(results => {
    const feed = new RSS({
      title: 'CFPs Ending Soon',
      feed_url: jsonFeedUrl,
      language: 'en',
    });

    for (let result of results) {
      feed.item({
        title: result.name,
        description: '<p>CFPs Due: ' + result.cfpEndDate + '</p>' +
        '<p>Location: ' + result.city + ', ' + result.country + '</p>',
        url: result.cfpUrl || result.url,
        date: result.cfpEndDate,
      });
    }

    res.writeHead(200, {
      'Content-Type': 'application/rss+xml',
    });
    res.end(feed.xml());
  });
});

app.get('/starting', (req, res) => {
  const jsonFeedUrl = 'https://api.jsonbin.io/b/' + req.webtaskContext.secrets.JSONBIN_STARTS_SOON_ID + '/latest';
  fetch(jsonFeedUrl).then(res => res.json()).then(results => {
    const feed = new RSS({
      title: 'Conferences Coming Soon',
      feed_url: jsonFeedUrl,
      language: 'en',
    });

    for (let result of results) {
      feed.item({
        title: result.name,
        description: '<p>Start Date: ' + result.startDate + '</p>' +
        '<p>Location: ' + result.city + ', ' + result.country + '</p>',
        url: result.url,
        date: result.startDate,
      });
    }

    res.writeHead(200, {
      'Content-Type': 'application/rss+xml',
    });
    res.end(feed.xml());
  });
});

module.exports = Webtask.fromExpress(app);
