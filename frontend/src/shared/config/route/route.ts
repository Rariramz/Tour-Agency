export enum AppRoutes {
  HOME = 'home',
  EXPLORE = 'explore',
  BOOKING = 'booking',
  LOGOUT = 'logout',
  AUTHORIZATION = 'authorization',
  ADMIN = 'admin',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ADMIN]: '/admin',
  [AppRoutes.EXPLORE]: '/explore',
  [AppRoutes.BOOKING]: '/booking',
  [AppRoutes.LOGOUT]: '/logout',
  [AppRoutes.AUTHORIZATION]: '/authorization',
  [AppRoutes.NOT_FOUND]: '*'
};
