// @ts-check
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default defineConfig(
  js.configs.recommended,

  ...tseslint.configs.recommended,

  importPlugin.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,
  {
    files: ['src/**/*.ts'],
    rules: {
      'import/order': [
        'warn',
        {
          alphabetize: { order: 'asc' },
        },
      ],
    },
  },

  eslintConfigPrettier,
);
