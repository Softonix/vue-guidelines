import type { Linter } from 'eslint'

export const baseRules: Linter.Config['rules'] = {
  'max-len': ['error', {
    code: 120,
    ignoreComments: true,
    ignoreTrailingComments: true,
    ignoreUrls: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreRegExpLiterals: true,
    ignorePattern: 'url\\('
  }],
  'no-undef': 'off',
  'no-empty': ['error', { allowEmptyCatch: true }],
  curly: ['error', 'all']
}
