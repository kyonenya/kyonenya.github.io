const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');

const port = process.env['WEB_APP_PORT'] ? process.env['WEB_APP_PORT'] : 3100;

express()
  .use(webpackDevMiddleware(webpack(config)))
  .get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'index_dev.html')))
  .get('/works', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'works_dev.html'))
  )
  .use(express.static(rootDir))
  .listen(port, () =>
    console.log(`Launching app... http://localhost:${port}\n`)
  );
