module.exports = {
  env: {
    browser: true,
    // es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    "import/order": ["warn", { "alphabetize": { "order": "asc" } }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }], // Promises must be handled appropriately or explicitly marked as ignored with the `void` operator
    '@typescript-eslint/no-non-null-assertion': 'off', // Forbidden non-null assertion
  },
};
