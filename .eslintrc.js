module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'standard',
  ],
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
      },
    },
  ],
  rules: {
    'comma-dangle': [1, 'always-multiline'],
  },
}
