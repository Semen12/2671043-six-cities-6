import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITY_DEFAULT, SortOption } from '../const';
import {
  changeCity,
  changeSort,
  loadComments,
  loadNearbyOffers,
  loadOffer,
  loadOffers,
  requireAuthorization,
  setError,
  setOfferLoadingStatus,
  setOfferNotFound,
  setOffersDataLoadingStatus,
  setUser,
} from './action';
import { DetailedOffer, Offer } from '../types/offer';
import { UserData } from '../types/auth-data';
import { Review } from '../types/review';

type InitialState = {
  cityActive: string;
  offers: Offer[];
  currentSortOption: SortOption;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserData | null;
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  hasError: boolean;
};

const initialState: InitialState = {
  offers: [],
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null,
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  hasError: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityActive = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.currentSortOption = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOfferNotFound, (state, action) => {
      state.hasError = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
      if (action.payload === true) {
        state.hasError = false;
      }
    });
});

export { reducer };
