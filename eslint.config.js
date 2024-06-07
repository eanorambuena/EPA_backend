import globals from 'globals'
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
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
