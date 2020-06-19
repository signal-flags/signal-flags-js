module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-plusplus': 'off',
    radix: 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: { jest: true },
      plugins: ['jest'],
      ...require('eslint-plugin-jest').configs.recommended,
    },
  ],
};
