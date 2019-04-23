const collect = require('./src/collect');
const categorize = require('./src/categorize');
const filter = require('./src/filter');
const save = require('./src/save');
require('dotenv').config();

async function run() {
  // Collect data
  const allConferences = await collect();
  const conferencesWithCategories = categorize(allConferences);

  // Filter just those coming soon
  const cfpSoon = filter(conferencesWithCategories);
  console.log(cfpSoon);

  // Save the results to JSONBin
  const res = await save(
    cfpSoon,
    process.env.JSONBIN_CFP_ENDS_SOON_ID,
    process.env.JSONBIN_SECRET_KEY
  );

  if (res.success === false) {
    return Promise.reject(res);
  } else {
    return Promise.resolve(res);
  }
}

run().then((results) => console.log('Results: ', results));
