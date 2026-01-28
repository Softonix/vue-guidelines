import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

import {
  IconsAutoImport,
  ComponentsAutoImport,
  ScriptsAutoImport
} from './.config/auto-imports/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    ScriptsAutoImport(),
    ComponentsAutoImport(),
    IconsAutoImport()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
