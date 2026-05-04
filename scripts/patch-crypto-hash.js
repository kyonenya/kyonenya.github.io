const crypto = require('crypto');

const originalCreateHash = crypto.createHash;

if (!crypto.__kyonenyaMd4PatchApplied) {
  crypto.createHash = function createHash(algorithm, options) {
    if (algorithm === 'md4') {
      return originalCreateHash.call(this, 'sha256', options);
    }

    return originalCreateHash.call(this, algorithm, options);
  };

  Object.defineProperty(crypto, '__kyonenyaMd4PatchApplied', {
    value: true,
    enumerable: false,
  });
}
