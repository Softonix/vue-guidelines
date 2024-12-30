import { createRequire } from 'module'

import js from '@eslint/js'
import ts from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import stylisticEslintPlugin from '@stylistic/eslint-plugin'

const eslintAutoImport = createRequire(import.meta.url)('./.eslintrc-auto-import.json')

export default [
  {
    name: 'app/files-to-ignore',
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      'dts/*.d.ts',
      'src/api/types/schema.d.ts',
      'src/api/types/axios.d.ts'
    ]
  },

  js.configs.recommended,
  ...ts.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig({ extends: ['recommended', 'stylistic'] }),

  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,ts,mts,tsx,vue}'],
    plugins: {
      '@stylistic': stylisticEslintPlugin
    },
    languageOptions: {
      ...eslintAutoImport,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    },

    rules: {
      'max-len': ['error', {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignorePattern: 'url\\('
      }],
      'no-undef': 'off',
      'no-prototype-builtins': 'off',
      'array-callback-return': 'off',

      'vue/max-attributes-per-line': 'off',
      'vue/require-default-prop': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/script-setup-uses-vars': 'error',
      'vue/attribute-hyphenation': 'off',
      'vue/v-on-event-hyphenation': 'off',
      'vue/custom-event-name-casing': 'off',
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below'
      }],
      'vue/v-slot-style': ['error', {
        atComponent: 'shorthand',
        default: 'shorthand',
        named: 'shorthand'
      }],

      '@stylistic/array-bracket-newline': ['error', 'consistent'],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/array-element-newline': ['error', 'consistent'],
      '@stylistic/block-spacing': ['error', 'always'],
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-dangle': ['error', 'never'],
      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/comma-style': ['error', 'last'],
      '@stylistic/computed-property-spacing': ['error', 'never'],
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/func-call-spacing': ['error', 'never'],
      '@stylistic/function-call-argument-newline': ['error', 'consistent'],
      '@stylistic/function-paren-newline': ['error', 'consistent'],
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
      '@stylistic/object-curly-newline': ['error', { consistent: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],
      '@stylistic/object-property-newline': ['error', { allowMultiplePropertiesPerLine: true }],
      '@stylistic/operator-linebreak': ['error', 'before'],
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
      '@stylistic/curly-newline': ['error', 'always'],
      '@stylistic/type-annotation-spacing': ['error', {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } }
      }],
      '@stylistic/member-delimiter-style': ['error',
        {
          multiline: {
            delimiter: 'none',
            requireLast: false
          },
          singleline: {
            delimiter: 'semi',
            requireLast: false
          }
        }],

      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        },
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          prefix: ['T']
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E']
        }
      ]
    }
  }
]
