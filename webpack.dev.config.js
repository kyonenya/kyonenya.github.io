const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          { loader: 'prettier-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx']
  },
  optimization: {},
  plugins: [
    new ESLintPlugin({
      files: './src/**',
      // fix: true,
    }),
  ],
};
