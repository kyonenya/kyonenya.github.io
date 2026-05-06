// @ts-check
import csso from 'postcss-csso';
import atImport from 'postcss-import';

export default {
  plugins: [atImport, csso],
};
