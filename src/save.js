const fetch = require('node-fetch');

const baseUrl = 'https://api.jsonbin.io/b';

module.exports = async(conferences, jsonbinId) => {
  return await fetch(
    baseUrl + '/' + jsonbinId,
    {
      method: 'PUT',
      body:    JSON.stringify(conferences),
      headers: { 'Content-Type': 'application/json' },
    }
  ).then(res => res.json());
};
