## Tech Stack

1. node.js
2. express
3. axios
4. jsdom

## How To Run

1. Install project dependencies

```bash
# using npm
npm i

# using yarn
yarn

# using pnpm
pnpm i
```

2. Run server to access the crawler endpoint.

```bash
npm run start

# or, if you want to start as development mode
npm run start:dev
```

3. Open your browser and visit this url: `http://localhost:8080/crawl?url=${URL}` (change URL as website url).
   ex: `http://localhost:8080/crawl?url=https://cmlabs.co
   Then, it will generate HTML file named with cmlabs.co.html.

4. You can access generated html from given url using this url: `http://localhost:8080/files/${URL_DOMAIN}.html`. <br /> ex: `http://localhost:8080/files/cmlabs.co.html`
