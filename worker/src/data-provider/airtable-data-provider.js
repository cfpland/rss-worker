const queryString = require('query-string');

class AirtableDataProvider {
  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
    this.baseOptions = {
      maxRecords: '100',
      view: 'closing_soon',
    };
  }

  getCfps(options) {
    if (options.category) {
      options.filterByFormula = `FIND("${options.category}", {category})`;
      delete options.category;
    }
    return this.get('conferences', this.constructOptions(options));
  }

  constructOptions(options) {
    return {...this.baseOptions, ...options}
  }

  get(path, options) {
    options.api_key = this.apiKey;
    const url = 'https://api.airtable.com/v0/' +
      this.baseId + '/' +
      path + '?' +
      queryString.stringify(options);
    return fetch(url)
      .then(res => res.json())
      .then(data => data.records.map(record => ({
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
