const csso = require('postcss-csso');
const atImport = require('postcss-import');

module.exports = {
  plugins: [atImport, csso],
};
