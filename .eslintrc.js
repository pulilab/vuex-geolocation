module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    es6: true,
    jasmine: true
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'camelcase': 0,
    'arrow-parens': 0,
    'one-var': 0,
    'semi': ["warn", "always"],
    'eol-last': ["error", "always"]
  },
  globals: {},
  settings: {
        'html/html-extensions': ['.html', '.vue']
    }
};
