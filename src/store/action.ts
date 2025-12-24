import { createAction } from '@reduxjs/toolkit';
import { DetailedOffer, Offer } from '../types/offer';
import { AuthorizationStatus, SortOption } from '../const';
import { UserData } from '../types/auth-data';
import { Review } from '../types/review';

export const changeCity = createAction<string>('city/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSort = createAction<SortOption>('offers/changeSort');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setUser = createAction<UserData | null>('user/setUser');

export const loadOffer = createAction<DetailedOffer | null>('data/loadOffer');

export const loadNearbyOffers = createAction<Offer[]>('data/loadNearbyOffers');

export const loadComments = createAction<Review[]>('data/loadComments');

export const setOfferLoadingStatus = createAction<boolean>('data/setOfferLoadingStatus');

export const setOfferNotFound = createAction<boolean>('data/setOfferNotFound');
