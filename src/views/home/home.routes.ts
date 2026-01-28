import type { RouteRecordRaw } from 'vue-router'

export const homeRouteNames = {
  home: 'home'
}

export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: homeRouteNames.home,
    component: () => import('./Home.vue')
  }
]
