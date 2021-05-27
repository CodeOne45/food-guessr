<h1 align="center">PJS4 - DUT INFO - Food Guessr 🍔</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

"Food Guessr" is an interactive website allowing the user to discover dishes from all over the world through a fun search game / quiz. The name or photo of a random dish is displayed and the player must select on a 3D globe the country of origin of the dish. Detailed dish information is then displayed if the user wants to know more.

### Project team :
 - KUMAR Aman (github : CodeOne45) - Project Manager / Full-Stack Developer 
 - LIN Xiumin (github : Xiumin-Lin) - Backend Developer
 - VAN Steven (github : Steven) - Frontend Developer  / Designr 
 - GLARNER Eliot (github : epg1213) 
 - KHALFAOUI Loqman (github : lokiklf) - Web Editor

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
