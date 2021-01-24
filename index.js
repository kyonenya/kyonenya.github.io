const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.config.js');

// Setup webpack-dev-middleware
const middleware = webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath,
});
const app = express();
app.use(middleware);

// Route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index_dev.html'));
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
try {
  pjs.register(app, middleware);
} catch (error) {
  console.log(error);
}
