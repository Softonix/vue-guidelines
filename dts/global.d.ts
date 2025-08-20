import 'vue-router'
import { routeNames } from '@/router/route-names'
import { globalProperties, portalNames } from '@/plugins'

declare module 'vue-router' {
  interface RouteMeta {
    // todo: this is just an example. Please setup your own route meta params.
    label?: string
    parentName?: string
    requireAuth?: boolean
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    // todo: Here you define you global vue definitions.
    $portalNames: typeof portalNames
    $routeNames: typeof routeNames
  }
}

export { }
