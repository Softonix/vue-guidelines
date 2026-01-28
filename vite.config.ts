import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

import { ComponentsAutoImport, ScriptsAutoImport } from './.config/auto-imports/vite'
import { IconsNamesGenerator } from './.config/icons-names-generator'
import { ModalsGenerator } from './.config/modals-generator'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    tailwindcss(),
    ScriptsAutoImport(),
    ComponentsAutoImport(),
    IconsNamesGenerator(),
    ModalsGenerator()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
