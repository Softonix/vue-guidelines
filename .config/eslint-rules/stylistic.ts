import type { Linter } from 'eslint'

export const stylisticRules: Linter.Config['rules'] = {
  '@stylistic/array-bracket-newline': ['error', 'consistent'],
  '@stylistic/array-bracket-spacing': ['error', 'never'],
  '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: false }],
  '@stylistic/comma-dangle': ['error', 'never'],
  '@stylistic/comma-spacing': ['error', { before: false, after: true }],
  '@stylistic/comma-style': ['error', 'last'],
  '@stylistic/computed-property-spacing': ['error', 'never'],
  '@stylistic/eol-last': ['error', 'always'],
  '@stylistic/function-call-spacing': ['error', 'never'],
  '@stylistic/function-call-argument-newline': ['error', 'consistent'],
  '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
  '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
  '@stylistic/jsx-quotes': ['error', 'prefer-double'],
  '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
  '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
  '@stylistic/linebreak-style': ['error', 'unix'],
  '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
  '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
  '@stylistic/no-mixed-spaces-and-tabs': ['error'],
  '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  '@stylistic/no-tabs': ['error'],
  '@stylistic/no-trailing-spaces': ['error'],
  '@stylistic/no-whitespace-before-property': ['error'],
  '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
  '@stylistic/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
  '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
  '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
  '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
  '@stylistic/padded-blocks': ['error', { blocks: 'never' }],
  '@stylistic/quote-props': ['error', 'as-needed'],
  '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
  '@stylistic/semi': ['error', 'never'],
  '@stylistic/semi-spacing': ['error', { before: false, after: true }],
  '@stylistic/semi-style': ['error', 'last'],
  '@stylistic/space-before-blocks': ['error', 'always'],
  '@stylistic/space-before-function-paren': ['error', 'always'],
  '@stylistic/space-in-parens': ['error', 'never'],
  '@stylistic/space-infix-ops': ['error'],
  '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
  '@stylistic/template-curly-spacing': ['error', 'never'],
  '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
  '@stylistic/rest-spread-spacing': ['error'],
  '@stylistic/no-multi-spaces': ['error'],
  '@stylistic/curly-newline': ['error', { multiline: true, minElements: 3, consistent: true }],
  '@stylistic/member-delimiter-style': ['error', {
    multiline: {
      delimiter: 'none',
      requireLast: false
    },
    singleline: {
      delimiter: 'semi',
      requireLast: false
    }
  }]
}
