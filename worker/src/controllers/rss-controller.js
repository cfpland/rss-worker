require('../helpers')();
const jsonbin = require('../data-provider/jsonbin-data-provider');
const StandardRssAdapter = require('../adapters/standard-rss-adapter');

class RssController {

  async cfps(req) {
    const cfpData = await jsonbin.getCfps();

    const rssAdapter = new StandardRssAdapter({
      title: 'CFPs Ending Soon',
      feedUrl: req.url,
      results: cfpData,
      type: 'cfps',
    });

    return response({
      res: rssAdapter.toRss(),
      headers: {
        'content-type': 'application/rss+xml',
        'cache-control': 'max-age=7200',
      },
    });
  }

  async starting(req) {
    let cfpData = await jsonbin.getStartingSoon();

    const rssAdapter = new StandardRssAdapter({
      title: 'Conferences Starting Soon',
      feedUrl: req.url,
      results: cfpData,
      type: 'starting',
    });

    return response({
      res: rssAdapter.toRss(),
      headers: {
        'content-type': 'application/rss+xml',
        'cache-control': 'max-age=7200',
      },
    });
  }

  async twitter(req) {
    let cfpData = await jsonbin.getCfps();

    const rssAdapter = new StandardRssAdapter({
      title: 'CFPs Ending Soon',
      feedUrl: req.url,
      results: cfpData,
      type: 'cfps',
    });

    return response({
      res: rssAdapter.toRss(),
      headers: {
        'content-type': 'application/rss+xml',
        'cache-control': 'max-age=7200',
      },
    });
  }

}

export default new RssController();
