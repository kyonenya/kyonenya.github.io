const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');
const generatePosts = require('./generatePosts');

const rootDir = __dirname;
const port = process.env['WEB_APP_PORT'] ? process.env['WEB_APP_PORT'] : 3100;

generatePosts();

express()
  .use(webpackDevMiddleware(webpack(config)))
  .get('/', (req, res) => res.sendFile(path.resolve(rootDir, 'index.html')))
  .get('/works', (req, res) =>
    res.sendFile(path.resolve(rootDir, 'works.html'))
  )
  .get('/about', (req, res) =>
    res.sendFile(path.resolve(rootDir, 'about.html'))
  )
  // redirect production -> development
  .get('/dist/:scriptName', (req, res) =>
    res.redirect(`/dist/dev/${req.params.scriptName}`)
  )
  .get('/dist/css/bundle.css', (req, res) => res.redirect('/src/css/index.css'))
  .use(express.static(rootDir))
  .listen(port, () =>
    console.log(`Launching app... http://localhost:${port}\n`)
  );
