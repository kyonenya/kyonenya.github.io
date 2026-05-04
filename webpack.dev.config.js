const path = require('path');
const productionConfig = require('./webpack.config');

module.exports = {
  ...productionConfig,
  mode: 'development',
  output: {
    ...productionConfig.output,
    filename: 'dist/dev/[name].js',
  },
  module: {
    rules: [
      {
        ...productionConfig.module.rules[0],
        use: [
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    ],
  },
};
