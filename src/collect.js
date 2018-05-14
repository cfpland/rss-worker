const fetch = require('node-fetch');

const baseUrl = 'https://api.github.com/repos/tech-conferences/confs.tech/contents/conferences';
const jsBaseUrl = 'https://raw.githubusercontent.com/tech-conferences/javascript-conferences/master/conferences';
const minYear = new Date().getFullYear();

function getJson(url) {
  return fetch(url).then(r => r.json());
}

async function getYears(minYear) {
  return (await getJson(baseUrl)).filter(result => Number(result.name) >= minYear);
}

function getCategories(year) {
  return getJson(baseUrl + '/' + year);
}

function getCategory(downloadUrl) {
  return getJson(downloadUrl);
}

function getJsCategory(year) {
  return getJson(jsBaseUrl + '/' + year + '/javascript.json');
}

module.exports = async () => {
  const years = await getYears(minYear);
  let results = [];

  for (let yearObject of years) {
    const categories = await getCategories(yearObject.name);

    // Get results for each category
    for (let categorySpec of categories) {
      const category = await getCategory(categorySpec.download_url);
      results = results.concat(category);
    }
    // Also get the JS category
    const jsResults = await getJsCategory(yearObject.name);
    results = results.concat(jsResults);
  }

  return Promise.resolve(results);
};
