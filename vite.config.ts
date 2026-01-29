import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

import {
  ComponentsAutoImport,
  ScriptsAutoImport,
  IconNamesGenerator,
  ModalsGenerator,
  RouteNamesGenerator
} from './.config'

export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    tailwindcss(),
    ScriptsAutoImport(),
    ComponentsAutoImport(),
    IconNamesGenerator(),
    ModalsGenerator(),
    RouteNamesGenerator()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
