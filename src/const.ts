export enum AppRoute {
  Main = '/',
  Login = '/login',
  Offer = '/offer/:id',
  Favorites = '/favorites',
  Unknown = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}
