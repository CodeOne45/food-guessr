## PJS4 - DUT INFO - Food Guessr


## Table of Contents:
- [Getting started](#getting-started)
- [Source Structure](#source-structure)
- [Webpack base configuration](#webpack-base-configuration)
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

## Webpack client configuration
#### General
entry - determine the initial client app index.js file
output - determine what is the bundle files names (filename, chunkFilename) inlcluding where to place them (path) and from where we expact clients to consume them (publicPath)
externals - specify which libraries will be used as the global libs (fetched from CDN)
#### Development
devServer - used for dev only to have compiled file cached in-memory, currently listen to port 3000 and proxy other requests to port 4300
plugins
- DefinePlugin - replace object to specific static strings, uses
- CaseSensitivePathsPlugin to generate compilation errors on windows (by default not throw errors for usage of wrong folder names)


## Run Scripts

Development
client
```
npm install
npm start
```
server (to see node options go to the package file and see what exactly the npm command do)
```
npm install
npm start
```

Production (before running the server you should compile all client code for client usage and SSR)
client
```
npm install
npm run compile
npm run compile-ssr
```
server (to see node options go to the package file and see what exactly the npm command do)
```
npm install
npm run start-prod
```
