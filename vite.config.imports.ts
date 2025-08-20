import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/* CONFIGURATION FOR SCRIPTS AUTO-IMPORT */
export const ImportsBuilder = () => AutoImport({
  dts: './dts/auto-imports.d.ts',
  viteOptimizeDeps: true,

  dirs: [
    './src/composables',
    './src/composables/**/index.ts',
    './src/api/*client.ts',
    './src/store/modules',
    './src/services',
    './src/views/**/*.store.ts',
    './src/views/**/*.service.ts'
  ],

  eslintrc: {
    enabled: true
  },

  imports: [
    'vue',
    'vue-router',
    '@vueuse/core',
    'pinia',
    'vue-i18n'
  ],
  resolvers: [ElementPlusResolver({ importStyle: false })]
})
