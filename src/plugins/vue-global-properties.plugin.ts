import type { Plugin } from 'vue'
import { routeNames } from '@/router/route-names'

export const globalProperties = {
  $routeNames: routeNames
}

export const VueGlobalPropertiesPlugin: Plugin = {
  install: (app) => {
    for (const i in globalProperties) {
      app.config.globalProperties[i] = globalProperties[i as keyof typeof globalProperties]
    }
  }
}
