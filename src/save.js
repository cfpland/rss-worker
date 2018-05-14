const fetch = require('node-fetch');
require('dotenv').config();

const baseUrl = 'https://api.jsonbin.io/b';

module.exports = async(conferences) => {
  return await fetch(
    baseUrl + '/' + process.env.JSONBIN_ID,
    {
      method: 'PUT',
      body:    JSON.stringify(conferences),
      headers: { 'Content-Type': 'application/json' },
    }
  ).then(res => res.json());
};
