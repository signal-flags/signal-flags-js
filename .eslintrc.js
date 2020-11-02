module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {},
  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: { jest: true },
      plugins: ['jest'],
      ...require('eslint-plugin-jest').configs.recommended,
    },
  ],
};
