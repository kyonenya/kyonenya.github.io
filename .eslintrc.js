module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/no-floating-promises': ['error', { ignoreIIFE: true }], // Promises must be handled appropriately or explicitly marked as ignored with the `void` operator
    '@typescript-eslint/no-non-null-assertion': 'off', // Forbidden non-null assertion
  },
};
