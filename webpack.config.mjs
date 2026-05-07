// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  mode: 'production',
  entry: {
    index: path.join(dirname, 'src', 'index.ts'),
    works: path.join(dirname, 'src', 'works', 'index.ts'),
    hydrate: path.join(dirname, 'src', 'hydrate.ts'),
  },
  output: {
    path: path.join(dirname, 'dist'),
    filename: '[name].js',
    hashFunction: 'sha256',
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
