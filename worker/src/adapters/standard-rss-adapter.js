const RSS = require('rss');

class StandardRssAdapter {
  constructor(options) {
    this.title = options.title || '';
    this.feedUrl = options.feedUrl || '';
    this.results = options.results || [];
    this.type = options.type || 'starting';
  }

  toRss() {
    const feed = new RSS({
      title: this.title,
      feed_url: this.feedUrl,
      language: 'en',
    });

    for (let result of this.results) {
      feed.item(this.generateItemFromResult(result));
    }

    return feed.xml();
  }

  getItemDescription(result) {
    return this.type === 'cfps' ?
      '<p>CFPs Due: ' + result.cfpEndDate + '</p>' +
      '<p>Conference Date: ' + result.startDate + '</p>' +
      '<p>Location: ' + result.city + ', ' + result.country + '</p>'
      :
      '<p>Start Date: ' + result.startDate + '</p>' +
      '<p>Location: ' + result.city + ', ' + result.country + '</p>';
  }

  generateItemFromResult(result) {
    return {
      title: result.name,
      description: this.getItemDescription(result),
      categories: [result.category],
      custom_elements: [
        {'eventStartDate': result.startDate},
        {'cfpEndDate': result.cfpEndDate},
        {'location': result.city + ', ' + result.country},
      ],
      url: (this.type === 'cfps' && result.cfpUrl) ? result.cfpUrl : result.url,
      date: (this.type === 'cfps' && result.cfpEndDate) ? result.cfpEndDate : result.startDate,
    };
  }
}

module.exports = StandardRssAdapter;
