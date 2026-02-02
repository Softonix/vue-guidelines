import type { Linter } from 'eslint'

export const typescriptRules: Linter.Config['rules'] = {
  '@typescript-eslint/no-unsafe-return': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  '@typescript-eslint/explicit-module-boundary-types': 'off',
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
