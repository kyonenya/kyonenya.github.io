module.exports = {
  env: {
    browser: true,
    es2020: true
  },   
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [],
  globals: {
    'dayjs': false,
    'dayjs_plugin_relativeTime': false,
  },
  rules: {
    'import/prefer-default-export': 0,
    'import/extensions': 0,
//    'camelcase': 0,
    'no-restricted-syntax': 0, // for...of
  },
};
