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

  getItemTitle(result) {
    return result.name;
  }

  getItemDescription(result) {
    return this.type === 'cfps' ?
      '<p>CFPs Due: ' + result.cfpEndDate + '</p>' +
      '<p>Conference Date: ' + result.startDate + '</p>' +
      '<p>Location: ' + this.getItemLocation(result) + '</p>'
      :
      '<p>Start Date: ' + result.startDate + '</p>' +
      '<p>Location: ' + this.getItemLocation(result) + '</p>';
  }

  getItemLocation(result) {
    return result.location ? result.location : result.city + ', ' + result.country;
  }

  generateItemFromResult(result) {
    return {
      title: this.getItemTitle(result),
      description: this.getItemDescription(result),
      categories: [result.category],
      custom_elements: [
        {'eventStartDate': result.startDate},
        {'cfpEndDate': result.cfpEndDate},
        {'isNew': result.isNew || false},
        {'location': this.getItemLocation(result)},
        {'has_perks': result.has_perks},
        {'travel_covered': result.travel_covered},
        {'hotel_covered': result.hotel_covered},
        {'stipend_covered': result.stipend_covered},
      ],
      url: (this.type === 'cfps' && result.cfpUrl) ? result.cfpUrl : result.url,
      date: (this.type === 'cfps' && result.cfpEndDate) ? result.cfpEndDate : result.startDate,
    };
  }
}

module.exports = StandardRssAdapter;
