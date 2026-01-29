import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/* CONFIGURATION FOR SCRIPTS AUTO-IMPORT */
export const ScriptsAutoImport = () => AutoImport({
  dts: './dts/auto-imports/auto-import-scripts.d.ts',

  dirs: [
    './src/api/client.ts',

    './src/composables',
    './src/views/**/composables',
    './src/features/**/composables',

    './src/utils',

    './src/services',
    './src/views/**/*.service.ts',
    './src/features/**/*.service.ts',

    './src/store/modules',
    './src/views/**/*.store.ts',
    './src/features/**/*.store.ts'
  ],

  vueTemplate: true,
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
