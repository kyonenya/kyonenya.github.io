function log(message) {
  console.log(`[dev-debug] ${message}`);
}

process.on('exit', (code) => {
  log(`exit code=${code}`);
});

process.on('beforeExit', (code) => {
  log(`beforeExit code=${code}`);
});

process.on('uncaughtException', (error) => {
  console.error('[dev-debug] uncaughtException');
  console.error(error && error.stack ? error.stack : error);
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  console.error('[dev-debug] unhandledRejection');
  console.error(reason && reason.stack ? reason.stack : reason);
  process.exitCode = 1;
});

log('requiring index.js');
require('../index.js');
log('index.js required');
