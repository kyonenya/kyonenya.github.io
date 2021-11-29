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
    // 'import/prefer-default-export': 'off',
    // 'import/extensions': 'off',
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral *'] }],
    // '@typescript-eslint/no-non-null-assertion': 'off',
    // 'no-console': 'off',
  },
};
