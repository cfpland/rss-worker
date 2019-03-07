# CFPLand Collector
Gets conference data, saves it to JSONBin. Also provides a webtask that converts those JSON files to RSS.

## Running/Deploying the Collector
- Build: `docker build -t karllhughes/cfpland-collector .`
- Run locally: `docker run -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... karllhughes/cfpland-collector:latest`
- Run locally with code in volume: `docker run -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... -v $(pwd):/app karllhughes/cfpland-collector:latest`

## Running/Deploying the Worker
This project also includes a Cloudflare Worker meant to be deployed as a proxy for an RSS feed.

- Create a `.env` file in the `./worker` directory
- Run the build from within `./worker`: `npm run build`
- Copy the `./worker/dist/index.js` file into Cloudflare as your worker.
- Two endpoints available: `BASE_URL/rss/cfps`, `BASE_URL/rss/starting`
