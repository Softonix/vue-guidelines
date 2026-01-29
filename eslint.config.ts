import { globalIgnores } from 'eslint/config'
import stylisticPlugin from '@stylistic/eslint-plugin'

import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'

import { eslintRules } from './.config'
import autoImport from './.config/auto-imports/auto-import.json'

export default defineConfigWithVueTs(
  globalIgnores([
    '**/dist/**',
    '**/dist-ssr/**',
    '**/coverage/**',
    'dts/*.d.ts',
    'src/api/types/schema.d.ts',
    'src/api/types/axios.d.ts'
  ]),

  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,ts,mts,tsx}'],
    plugins: {
      '@stylistic': stylisticPlugin
    },
    languageOptions: {
      globals: autoImport.globals
    }
  },

  ...pluginVue.configs['flat/strongly-recommended'],
  vueTsConfigs.recommendedTypeChecked,
  vueTsConfigs.stylisticTypeChecked,

  {
    name: 'app/rules-overrides',
    rules: eslintRules
  }
)

