const moment = require('moment');
const today = moment();

const soonDays = 42;

const filter = (conferences) => {
  const results = [];
  for (let conference of conferences) {
    const cfpEndDate = moment(conference.cfpEndDate);

    if (conference.cfpEndDate && cfpEndDate.diff(today, 'days') <= soonDays && cfpEndDate.diff(today, 'days') >= 0) {
      results.push(conference);
    }
  }

  return results.sort((a, b) => moment(a.cfpEndDate).diff(moment(b.cfpEndDate)));
};

module.exports = filter;
