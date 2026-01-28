import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/* CONFIGURATION FOR COMPONENTS AUTO-IMPORT */
export const ComponentsAutoImport = () => Components({
  dts: './dts/auto-imports/auto-import-components.d.ts',
  globs: [
    './src/components/**/*.vue',
    './src/views/**/components/**/*.vue'
  ],
  resolvers: [
    ElementPlusResolver({ importStyle: false })
  ]
})
