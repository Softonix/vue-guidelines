import { globalIgnores } from 'eslint/config'

import pluginStylistic from '@stylistic/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

import { eslintRules } from './.config'
import autoImport from './.config/auto-imports/auto-import.json'

export default defineConfigWithVueTs(
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    'public/**',
    'src/features/platform/api/schema.ts'
  ]),

  pluginStylistic.configs.recommended,
  pluginVue.configs['flat/strongly-recommended'],
  vueTsConfigs.recommendedTypeChecked,
  vueTsConfigs.stylisticTypeChecked,

  {
    name: 'app/custom-rules',
    files: ['**/*.{vue,ts,mts,tsx}'],
    rules: eslintRules,
    languageOptions: {
      globals: autoImport.globals
    }
  }
)

