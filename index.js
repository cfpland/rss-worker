const collect = require('./src/collect');
const filter = require('./src/filter');
const save = require('./src/save');
require('dotenv').config();

async function run() {
  // Collect data
  const allConferences = await collect();

  // Filter just those coming soon
  const startsSoon = filter.startsSoon(allConferences);
  const cfpSoon = filter.cfpEndsSoon(allConferences);

  // Save the results
  const res1 = await save(startsSoon, process.env.JSONBIN_STARTS_SOON_ID);
  const res2 = await save(cfpSoon, process.env.JSONBIN_CFP_ENDS_SOON_ID);

  if (res1.success === false || res2.success === false) {
    return Promise.reject([res1, res2]);
  } else {
    return Promise.resolve([res1, res2]);
  }
}

run().then((results) => console.log('Results: ', results));
