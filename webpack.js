const webpack = require('webpack');
const config = require('./webpack.config');

webpack(config, (error, stats) => {
  if (error) {
    console.error(error);
    process.exitCode = 1;
    return;
  }

  if (!stats) {
    console.error('Webpack finished without stats.');
    process.exitCode = 1;
    return;
  }

  console.log(stats.toString({ colors: true }));

  if (stats.hasErrors()) {
    process.exitCode = 1;
  }
});
