# Warning: This project is highly outdated, and code should not be expected to run currently

# ValueFlows marketplace app

> The 'kitchen sink' of REA-based marketplaces: gifting, requests, offers & needs, exchanges, sales, multilateral trades & multi-value exchanges.

<!-- MarkdownTOC -->

- [Development setup](#development-setup)
	- [Prerequisites](#prerequisites)
	- [Initialising](#initialising)
- [Running for development](#running-for-development)
- [Building and running in production mode](#building-and-running-in-production-mode)
- [Deploying to the web](#deploying-to-the-web)
	- [With Vercel](#with-vercel)
	- [With surge](#with-surge)
- [Framework](#framework)
- [License](#license)

<!-- /MarkdownTOC -->

## Development setup

### Prerequisites

- `npm i -g pnpm` if you don't already have [PNPM](https://pnpm.js.org/) installed

### Initialising

- clone this repo
- `pnpm i`

## Running for development

- Simply `pnpm run dev` and navigate to [localhost:5000](http://localhost:5000).
- By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in `package.json` to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in your package.json's `dependencies` so that the app will work when you deploy to platforms like [Heroku](https://heroku.com).


## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```


## Framework

- UI components authored with [Svelte](https://svelte.dev/)
	- Forms with [Svelte Formup](https://svelte-formup.js.org/) & [Yup](https://www.npmjs.com/package/yup) schema validation
	- App-level routing with [Routve](https://www.npmjs.com/package/routve)
	- Compiled to other runtimes via [Svelte UCC](https://github.com/pospi/svelte-universal-component-compiler)
- API connections through [Apollo GraphQL](https://www.apollographql.com/)
	- Pluggable backends via `@vf-ui/graphql-client-*` modules


## License

Apache 2.0
