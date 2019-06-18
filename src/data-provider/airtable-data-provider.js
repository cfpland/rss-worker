const queryString = require('query-string/index');
const airtableCategories = {
  reccuVH9RAqQtSHpx: '.NET',
  recPsE290uvH6WTk7: 'CSS',
  recjXmS0Xj12HgDpc: 'Data',
  recCWNeVmnvqqLZ3g: 'Design',
  recir5J2EveRLjSVM: 'DevOps',
  recpadyXkUIVXE9Su: 'General',
  recVLIw2l7UPVWzhu: 'Go',
  recdo1D4TYjfXCtY8: 'Java',
  recnzqyy9cKkwmaaR: 'Javascript',
  recdpNkA8p9PGxmte: 'Mobile',
  recGEhJ4pbFWq0qQP: 'PHP',
  recZeJLEe2SeOw3dp: 'Python',
  rec0KLa89eHs0Nzpc: 'Ruby',
  reccvolsacTi6o7Wt: 'Security',
};

function getPerksList(data) {
  let result = '';
  if (data.perks_checked) {
    if (data.travel_covered) {
      result += 'Travel, ';
    }
    if (data.hotel_covered) {
      result += 'Hotel, ';
    }
    if (data.stipend_covered) {
      result += 'Stipend, ';
    }
    if (result.length < 2) {
      result = 'None';
    } else {
      result = result.substring(0, result.length - 2);
    }
  } else {
    result = '❓';
  }

  return result;
}

class AirtableDataProvider {
  constructor() {
    this.apiKey = process.env.AIRTABLE_API_KEY;
    this.baseId = process.env.AIRTABLE_BASE_ID;
    this.baseOptions = {
      maxRecords: '200',
      view: 'closing_in_21',
    };
  }

  getCfps(options) {
    if (options && options.category) {
      options.filterByFormula = `"${options.category}"={category}`;
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
        category: airtableCategories[record.fields.category] || 'General',
        url: record.fields.cfp_url,
        isNew: !!record.fields.is_new,
        perksList: getPerksList(record.fields),
      }))
    );
  }
}

module.exports = new AirtableDataProvider();
