import { defineSoftonixEslintConfig } from '@softonix/eslint-config-vue'
import eslintAutoImport from './.eslintrc-auto-import.json'

export default defineSoftonixEslintConfig({
  autoImports: eslintAutoImport,
  ignores: {
    extend: [
      'dts/*.d.ts',
      'src/api/types/schema.d.ts',
      'src/api/types/axios.d.ts'
    ]
  }
})
