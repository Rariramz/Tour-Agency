export enum AppRoutes {
  MAIN = 'main',
  PLACES = 'places',
  NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.PLACES]: '/places',
  [AppRoutes.NOT_FOUND]: '*'
};
