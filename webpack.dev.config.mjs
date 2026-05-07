// @ts-check
import productionConfig from './webpack.config.mjs';

export default {
  ...productionConfig,
  mode: 'development',
  output: {
    ...productionConfig.output,
    filename: 'dev/[name].js',
    publicPath: '/dist/',
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
