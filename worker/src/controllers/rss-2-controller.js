require('../helpers')();
const airtable = require('../data-provider/airtable-data-provider');
const StandardRssAdapter = require('../adapters/standard-rss-adapter');

class Rss2Controller {

  async cfps(req) {
    const cfpData = await airtable.getCfps({category: req.query.category || undefined});

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

export default new Rss2Controller();
