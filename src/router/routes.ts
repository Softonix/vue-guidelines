import { homeRoutes } from '@/views/home/home.routes'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  ...homeRoutes
]

export {
  routes
}
