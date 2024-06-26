const ts = require('typescript-eslint');
const js = require('@eslint/js');
const prettier = require('eslint-config-prettier');
const jest = require('eslint-plugin-jest');

module.exports = ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    plugins: {
      jest: jest,
    },
    rules: {
      'no-undef': 'warn',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    ignores: ['lib/**'],
  },
  {
    files: ['*.js'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
  {
    languageOptions: {
      globals: {
        __dirname: true,
        console: true,
        exports: true,
        module: true,
        require: true,
      },
    },
  },
);
