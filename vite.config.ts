import { fileURLToPath, URL } from 'node:url'

import { visualizer } from 'rollup-plugin-visualizer'
import tailwindcss from '@tailwindcss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { SoftonixAutoImportsVue, Resolvers } from '@softonix/vite-plugin-auto-imports-vue'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    visualizer({
      open: true
    }),
    SoftonixAutoImportsVue({
      scripts: {
        dirs: ['./src/api/*client.ts'],
        imports: [
          'vue-router',
          '@vueuse/core',
          'pinia',
          'vue-i18n'
        ],
        resolvers: [
          Resolvers.ElementPlusResolver({ importStyle: false })
        ]
      },
      components: {
        resolvers: [
          Resolvers.ElementPlusResolver()
        ]
      }
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
