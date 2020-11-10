module.exports = {
  env: {
    browser: true,
    es2020: true
  },   
  extends: [
    'eslint:recommended',
  ],
  // parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [],
  globals: {
    'moment': false,
  },
  rules: {
    // no-undef: 0,
  },
};
