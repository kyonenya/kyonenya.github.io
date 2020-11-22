const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },
  watchOptions: {
    ignored: '**', // disable file watching
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'prettier-loader',
        ],
      },
    ],
  },
  optimization: {},
  plugins: [
    new ESLintPlugin({
      files: './src',
      // fix: true,
    }),
  ],
};
