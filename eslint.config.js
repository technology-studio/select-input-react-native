const txoConfig = require('eslint-config-txo-typescript')

/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
  ...txoConfig.default,
  {
    ignores: [
      'babel.config.js',
      'src/components/**/*.spec.*',
    ],
  },
]

module.exports = config
