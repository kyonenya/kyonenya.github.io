const express = require('express');
const app = express();
const path = require('path');

// Setup webpack-dev-middleware
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
});
app.use(middleware);

// Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index_dev2.html'));
});
const rootDir = __dirname;
app.use(express.static(rootDir));

// Launch app
const port = process.env['WEB_APP_PORT']
  ? process.env['WEB_APP_PORT']
  : 3000;
app.listen(port, () => {
  console.log(`Launching app... http://localhost:${port}\n`);
});

// Register app and middleware. Required for better performance when running from play.js
try { pjs.register(app, webpackMiddleware); } catch (error) { }
