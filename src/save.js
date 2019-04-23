const fetch = require('node-fetch');

const baseUrl = 'https://api.jsonbin.io/b';

module.exports = (conferences, jsonbinId, jsonbinSecret) => {
  return fetch(
    baseUrl + '/' + jsonbinId,
    {
      method: 'PUT',
      body:    JSON.stringify(conferences),
      headers: { 'Content-Type': 'application/json', 'secret-key': jsonbinSecret },
    }
  ).then(res => res.json());
};
