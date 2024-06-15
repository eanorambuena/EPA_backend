const globals = require('globals')
const pluginJs = require('@eslint/js')
const stylistic = require('@stylistic/eslint-plugin')

module.exports = [
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  stylistic.configs.customize({
    indent: 2,
    maxLen: 110,
    trailingSpaces: false,
    blockSpacing: true,
    quotes: 'single',
    semi: false,
    linebreakStyle: 'unix',
    commaDangle: 'never',
    eolLast: true
  })
]
