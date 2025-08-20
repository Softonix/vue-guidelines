import { fileURLToPath, URL } from 'node:url'

import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { IconsPluginCustom } from './vite.config.icons'
import { ComponentsBuilder } from './vite.config.components'
import { ImportsBuilder } from './vite.config.imports'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    visualizer({
      open: true
    }),

    IconsPluginCustom(),
    ComponentsBuilder(),
    ImportsBuilder()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
