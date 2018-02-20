module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    'jest/globals': true
  },
  extends: ['plugin:jest/recommended', 'standard'],
  plugins: [
    'html',
    'jest'
  ],
  rules: {
    'camelcase': 0,
    'arrow-parens': 0,
    'one-var': 0,
    'semi': ['warn', 'always'],
    'eol-last': ['error', 'always']
  },
  globals: {},
  settings: {
        'html/html-extensions': ['.html', '.vue']
    }
};
