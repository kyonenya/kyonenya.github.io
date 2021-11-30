const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    index: path.join(__dirname, 'src', 'index.ts'),
    works: path.join(__dirname, 'src', 'works', 'index.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
