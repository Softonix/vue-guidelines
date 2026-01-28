import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export const routeGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  next()
}
