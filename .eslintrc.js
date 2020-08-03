module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'standard',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 2 }],
      },
    },
  ],
  rules: {
    'comma-dangle': [1, 'always-multiline'],
    'no-shadow': 2,
  },
}
