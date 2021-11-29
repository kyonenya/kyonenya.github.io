const path = require('path');

module.exports = {
  mode: 'development',
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
