const moment = require('moment');
const today = moment();

const soonDays = 30;

const startsSoon = (conferences) => {
  const results = [];
  for (let conference of conferences) {
    const startDate = moment(conference.startDate);

    if (conference.startDate && startDate.diff(today, 'days') <= soonDays && startDate.diff(today, 'days') >= 0) {
      results.push(conference);
    }
  }

  return results.sort((a, b) => moment(a.startDate).diff(moment(b.startDate)));
};

const cfpEndsSoon = (conferences) => {
  const results = [];
  for (let conference of conferences) {
    const cfpEndDate = moment(conference.cfpEndDate);

    if (conference.cfpEndDate && cfpEndDate.diff(today, 'days') <= soonDays && cfpEndDate.diff(today, 'days') >= 0) {
      results.push(conference);
    }
  }

  return results.sort((a, b) => moment(a.cfpEndDate).diff(moment(b.cfpEndDate)));
};

module.exports = {
  startsSoon,
  cfpEndsSoon,
};
