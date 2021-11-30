const productionConfig = require('./webpack.config');

module.exports = {
  ...productionConfig,
  mode: 'development',
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
