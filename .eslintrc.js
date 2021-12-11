module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript', // ≠eslint-plugin-import
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'import/order': ['warn', { alphabetize: { order: 'asc' } }],
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }], // Promises must be handled appropriately or explicitly marked as ignored with the `void` operator
    // '@typescript-eslint/no-non-null-assertion': 'off', // Forbidden non-null assertion
  },
};
