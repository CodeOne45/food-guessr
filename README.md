## PJS4 - DUT INFO - Food Guessr

## Table of Contents:

- [Getting started](#getting-started)
- [Source Structure](#source-structure)
- [Run Scripts](#run-scripts)

## Getting started

First you should clone the repository

```
git clone https://github.com/CodeOne45/food-guessr
```

Once the clone is finished you must npm install the both of them

```
npx install -g create-react-app
```

## Source Structure

- client - where all the react client code exist, also where the client development environment files are
  - src
    - api - the place for all api calls
    - components - dumb components home
    - containers - when using redux this is where the connected components should live
    - resources - folder for utils, helpers etc.
    - styleMain - main style configurations
    - App.js - the main app file
    - index.js - where it all begins:)
    - routes - helper to dynamically configure your web app routes
  - webpack
    - clientConfig.js - general webpack configurations for compiling the client for using on the browser
    - webpack.dev.js - for development environment webpack configuration, mostly the usage of dev-server
    - webpack.prod.js - when you want to go to production
    - ssrConfig.js - general webpack configurations for compiling the client for SSR
    - webpack.ssr.js - will be used when ssr
  - .babelrc
  - webpack.config.js
- server - where all the node server code exist

## Run Scripts

Development

```
npm install
npm start
```

Production (before running the server you should compile all client code for client usage and SSR)

```
npm install
npm run compile
npm run compile-ssr
```
