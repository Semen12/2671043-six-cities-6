import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus, SortOption } from '../const';
import { UserData } from '../types/auth-data';

export const changeCity = createAction<string>('city/changeCity');

export const loadOffers = createAction<Offer[]>('offers/loadOffers');

export const changeSort = createAction<SortOption>('offers/changeSort');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('app/setError');

export const setUser = createAction<UserData | null>('user/setUser');
