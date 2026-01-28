import type { RouteRecordRaw } from 'vue-router'
import { routeNames } from './route-names'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    name: routeNames.home,
    component: () => import('@/views/home/Home.vue')
  }
]

export {
  routes
}
