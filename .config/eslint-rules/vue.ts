import type { Linter } from 'eslint'

export const vueRules: Linter.Config['rules'] = {
  'vue/no-multiple-template-root': 'off',
  'vue/max-attributes-per-line': 'off',
  'vue/singleline-html-element-content-newline': 'off',
  'vue/multi-word-component-names': 'off',
  'vue/attribute-hyphenation': 'off',
  'vue/v-on-event-hyphenation': 'off',
  'vue/object-curly-spacing': ['error', 'always'],
  'vue/v-slot-style': ['error', {
    atComponent: 'shorthand',
    default: 'shorthand',
    named: 'shorthand'
  }]
}
