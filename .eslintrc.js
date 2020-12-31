module.exports = {
  env: {
    browser: true,
    es2020: true
  },   
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
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
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-console': 0,
  },
};
