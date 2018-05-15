# CFPLand Collector
Gets conference data, saves it to JSONBin. Also provides a webtask that converts those JSON files to RSS.

## Running/Deploying the Collector
- Build: `docker build -t karllhughes/cfpland-collector .`
- Run locally: `docker run -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... karllhughes/cfpland-collector:latest`
- Run locally with code in volume: `docker run -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... -v $(pwd):/app karllhughes/cfpland-collector:latest`
- Run in Hyper.sh: `hyper run -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... karllhughes/cfpland-collector:latest`
- Or set to run via cron: `hyper cron create --minute=0 --hour=3 --dom=* -e JSONBIN_STARTS_SOON_ID=... -e JSONBIN_CFP_ENDS_SOON_ID=... --name cfpland-collector-1 karllhughes/cfpland-collector:latest`

## Running/Deploying the Webtask

- Deploy the webtask: `wt create -p node8 -n cfpland-collector -s JSONBIN_STARTS_SOON_ID=... -s JSONBIN_CFP_ENDS_SOON_ID=... index.js`
- Two endpoints available: `/cfps`, `/starting`
