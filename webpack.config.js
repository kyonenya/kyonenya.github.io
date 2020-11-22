const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
