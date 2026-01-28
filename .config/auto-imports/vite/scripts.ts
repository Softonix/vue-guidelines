import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/* CONFIGURATION FOR SCRIPTS AUTO-IMPORT */
export const ScriptsAutoImport = () => AutoImport({
  dts: './dts/auto-imports/auto-import-scripts.d.ts',

  dirs: [
    './src/composables',
    './src/composables/**/index.ts',
    './src/api/client.ts',
    './src/store/modules',
    './src/services',
    './src/views/**/*.store.ts',
    './src/views/**/*.service.ts'
  ],

  eslintrc: {
    enabled: true,
    filepath: './.config/auto-imports/auto-import.json'
  },

  imports: [
    'vue',
    'vue-router',
    '@vueuse/core',
    '@vueuse/head',
    'pinia'
  ],
  resolvers: [ElementPlusResolver()]
})
