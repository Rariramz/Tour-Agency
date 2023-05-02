export enum AppRoutes {
  HOME = 'home',
  EXPLORE = 'explore',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.EXPLORE]: '/explore',
  [AppRoutes.NOT_FOUND]: '*'
};
