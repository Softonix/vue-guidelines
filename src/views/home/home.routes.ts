export const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: routeNames.home,
    component: () => import('./Home.vue')
  }
]
