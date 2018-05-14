const moment = require('moment');
const today = moment();

const soonDays = 30;

function conferenceStartsSoon(conference) {
  const startDate = moment(conference.startDate);
  return conference.startDate && startDate.diff(today, 'days') <= soonDays && startDate.diff(today, 'days') >= 0;
}

function conferenceCfpEndsSoon(conference) {
  const cfpEndDate = moment(conference.cfpEndDate);
  return conference.cfpEndDate && cfpEndDate.diff(today, 'days') <= soonDays && cfpEndDate.diff(today, 'days') >= 0;
}

module.exports = (conferences) => {
  // TODO: Organize and sort conferences into two arrays
  let conferences = conferences.filter(
    conference => (
      conferenceStartsSoon(conference) ||
      conferenceCfpEndsSoon(conference)
    ) ? conference : null
  );

  return conferences;
};
