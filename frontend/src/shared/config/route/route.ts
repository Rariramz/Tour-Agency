export enum AppRoutes {
  HOME = 'home',
  EXPLORE = 'explore',
  BOOKING = 'booking',
  LOGOUT = 'logout',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.EXPLORE]: '/explore',
  [AppRoutes.BOOKING]: '/booking',
  [AppRoutes.LOGOUT]: '/logout',
  [AppRoutes.NOT_FOUND]: '*'
};
