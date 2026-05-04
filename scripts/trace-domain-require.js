const Module = require('module');
const originalLoad = Module._load;

Module._load = function traceDomainRequire(request, parent, isMain) {
  const parentName = parent && parent.filename ? parent.filename : '<unknown>';
  if (request === 'domain' || request === 'node:domain') {
    console.error(`[domain-trace] ${request} requested by ${parentName}`);
  }

  try {
    return originalLoad.apply(this, arguments);
  } catch (error) {
    if (
      error &&
      error.code === 'ERR_DOMAIN_CALLBACK_NOT_AVAILABLE' &&
      request !== 'domain' &&
      request !== 'node:domain'
    ) {
      console.error(
        `[domain-trace] ${request} failed while loading; parent=${parentName}`
      );
    }
    throw error;
  }
};
