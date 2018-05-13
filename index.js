const fetch = require('node-fetch');
const baseUrl = 'https://api.github.com/repos/tech-conferences/confs.tech/contents/conferences';

async function getYears(minYear) {
  let results = [];
  // Get all years >= minimum
  await fetch(baseUrl)
    .then(res => res.json())
    .then(res => results = res.filter(result => Number(result.name) >= minYear));

  return results;
}

async function getCategories(year) {
  let results = [];
  await fetch(baseUrl + '/' + year)
    .then(res => res.json())
    .then(res => results = res);

  return results;
}

async function getCategory(downloadUrl) {
  let results = [];
  await fetch(downloadUrl)
    .then(res => res.json())
    .then(res => results = res);

  return results;
}

async function run() {
  const minYear = new Date().getFullYear();
  const years = await getYears(minYear);
  let results = [];
  for (let yearObject of years) {
    const categories = await getCategories(yearObject.name);
    for (let categorySpec of categories) {
      const category = await getCategory(categorySpec.download_url);
      results = results.concat(category);
    }
  }

  return Promise.resolve(results);
}

run().then((results) => console.log('Results: ', results.length));
