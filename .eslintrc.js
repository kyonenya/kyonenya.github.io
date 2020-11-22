module.exports = {
  env: {
    browser: true,
    es2020: true
  },   
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier'
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
    'indent': ['error', 2, { 'ignoredNodes': ['TemplateLiteral *'] }],
  },
};
