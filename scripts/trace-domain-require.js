const Module = require('module');
const originalLoad = Module._load;

Module._load = function traceDomainRequire(request, parent, isMain) {
  if (request === 'domain' || request === 'node:domain') {
    const parentName = parent && parent.filename ? parent.filename : '<unknown>';
    console.error(`[domain-trace] ${request} requested by ${parentName}`);
  }

  return originalLoad.apply(this, arguments);
};
