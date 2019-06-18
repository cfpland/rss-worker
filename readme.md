# CFP Land Worker
Provides a [Cloudflare Worker](https://www.cloudflare.com/products/cloudflare-workers/) that generates an RSS feed for CFP Land.

Live feed: `https://feeds.cfpland.com/v2/rss/cfps`

## Running/Deploying the Worker

- Create a `.env` file directory with the following:

  > AIRTABLE_API_KEY=
  > AIRTABLE_BASE_ID=

- Install packages: `npm install`
- Run the build: `npm run build`
- Copy the `./dist/index.js` file into Cloudflare as your worker.
- Two endpoints available: `BASE_URL/rss/cfps`, `BASE_URL/rss/twitter`
