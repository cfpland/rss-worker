const StandardRssAdapter = require('./standard-rss-adapter');

class TwitterRssAdapter extends StandardRssAdapter {

  getItemDescription(result) {
    return `${result.name} is being held in ${result.location} on ${result.startDate}.`;
  }

  getItemTitle(result) {
    const name = result.twitter || result.name;
    const category = (result.category && result.category !== 'General') ? `#${result.category}` : '';

    return `Attention speakers: CFPs end on ${result.cfpEndDate} for ${name}. Submit your proposal today! ${category}`
  }
}

module.exports = TwitterRssAdapter;
