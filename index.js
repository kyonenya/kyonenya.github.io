const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');

const rootDir = __dirname;
const port = process.env['WEB_APP_PORT'] ? process.env['WEB_APP_PORT'] : 3000;
const middleware = webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
});

const app = express();
app
  .use(middleware)
  .get('/', (req, res) => res.sendFile(path.resolve(rootDir, 'index_dev.html')))
  .use(express.static(rootDir))
  .listen(port, () => console.log(`Launching app... http://localhost:${port}\n`))
  ;

// Register app and middleware. Required for better performance when running from play.js
// pjs.register(app, middleware);
