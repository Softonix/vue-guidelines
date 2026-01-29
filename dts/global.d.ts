/* eslint-disable @typescript-eslint/naming-convention */

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    // todo: this is just an example. Please setup your own route meta params.
    label?: string
    requireAuth?: boolean
  }
}

// TODO: Here you define you global vue definitions. Uncomment if needed
// declare module 'vue' {
// interface ComponentCustomProperties {
// }
// }

export { }
