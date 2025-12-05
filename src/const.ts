export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum AuthStatus {
  Auth = 'Auth',
  NoAuth = 'NoAuth',
}

export enum HousingType {
  Apartment = 'Apartment',
  House = 'House',
  Hotel = 'Hotel',
  Room = 'Room',
}

export const MIN_COMMENT_LENGTH = 50;
export const MAX_COMMENT_LENGTH = 300;

export const RatingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};
