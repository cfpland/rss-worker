const collect = require('./src/collect');
const filter = require('./src/filter');
const save = require('./src/save');
require('dotenv').config();

async function run() {
  // Collect data
  let conferences = await collect();

  // Filter just those coming soon
  conferences = filter(conferences);

  // Organize results
  conferences = filter(conferences);

  // Save the results
  const res = await save(conferences);

  if (res.success === true) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res.message);
  }
}

run().then((results) => console.log('Results: ', results.length));
