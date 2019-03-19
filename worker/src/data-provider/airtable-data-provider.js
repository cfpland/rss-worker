const queryString = require('query-string');

class AirtableDataProvider {
  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
  }

  getCfps() {
    return this.get('conferences', {
      maxRecords: '100',
      view: 'coming_soon',
    });
  }

  get(path, options) {
    options.api_key = this.apiKey;
    return fetch('https://api.airtable.com/v0/' +
      this.baseId + '/' +
      path + '?' +
      queryString.stringify(options)
    ).then(res => res.json()).then(data => data.records
      .map(record => ({
        name: record.fields.name,
        cfpEndDate: record.fields.cfp_due_date,
        startDate: record.fields.event_start_date,
        location: record.fields.location,
        // TODO: Add category: record.fields.category is ID
      }))
    );
  }
}

module.exports = new AirtableDataProvider();
