const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function log(message) {
  console.log(`[probe] ${message}`);
}

function check(label, fn, options = {}) {
  log(`${label}: start`);
  try {
    const result = fn();
    log(`${label}: ok`);
    return result;
  } catch (error) {
    log(`${label}: failed`);
    console.error(error && error.stack ? error.stack : error);
    if (!options.allowFailure) process.exitCode = 1;
    return undefined;
  }
}

log(`node ${process.version}`);
if (typeof process.hasUncaughtExceptionCaptureCallback === 'function') {
  log(
    `hasUncaughtExceptionCaptureCallback=${process.hasUncaughtExceptionCaptureCallback()}`
  );
}

check('require scripts/patch-crypto-hash', () =>
  require(path.join(rootDir, 'scripts', 'patch-crypto-hash'))
);
check('require domain', () => require('domain'), { allowFailure: true });
check('require express', () => require('express'));
const webpack = check('require webpack', () => require('webpack'));
const config = check('require webpack.dev.config.js', () =>
  require(path.join(rootDir, 'webpack.dev.config.js'))
);
const webpackDevMiddleware = check('require webpack-dev-middleware', () =>
  require('webpack-dev-middleware')
);
check('require scripts/register-typescript', () =>
  require(path.join(rootDir, 'scripts', 'register-typescript'))
);
check('require generatePosts', () => require(path.join(rootDir, 'generatePosts')));
check('require generateSitemap', () =>
  require(path.join(rootDir, 'generateSitemap'))
);
check('require generateBibliography', () =>
  require(path.join(rootDir, 'generateBibliography'))
);
check('require src/ssg.ts', () => require(path.join(rootDir, 'src', 'ssg.ts')));

if (webpack && config && webpackDevMiddleware) {
  check('create webpack compiler', () => webpack(config));
  const compiler = webpack(config);
  const middleware = check('create webpack-dev-middleware', () =>
    webpackDevMiddleware(compiler)
  );
  if (middleware && typeof middleware.close === 'function') {
    middleware.close(() => log('webpack-dev-middleware: closed'));
  }
}
