const fs = require('fs');
const path = require('path');

const logPath = path.resolve(__dirname, '..', 'dev-debug.log');

function log(message) {
  fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${message}\n`);
}

fs.writeFileSync(logPath, '');
log('script entered');
log(`node ${process.version}`);
log(`argv ${JSON.stringify(process.argv)}`);

process.on('exit', (code) => {
  log(`exit code=${code}`);
});

process.on('beforeExit', (code) => {
  log(`beforeExit code=${code}`);
});

process.on('uncaughtException', (error) => {
  log('uncaughtException');
  log(error && error.stack ? error.stack : String(error));
  process.exitCode = 1;
});

process.on('unhandledRejection', (reason) => {
  log('unhandledRejection');
  log(reason && reason.stack ? reason.stack : String(reason));
  process.exitCode = 1;
});

log('requiring index.js');
require('../index.js');
log('index.js required');
