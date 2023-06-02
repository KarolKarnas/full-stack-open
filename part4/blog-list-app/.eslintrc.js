module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
    // jest: true
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prefer-destructuring': 0,
    'no-console': 0,
  },
}
