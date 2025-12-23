import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITY_DEFAULT, SortOption } from '../const';
import { changeCity, changeSort, loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUser } from './action';
import { Offer } from '../types/offer';
import { UserData } from '../types/auth-data';


type InitialState = {
  cityActive: string;
  offers: Offer[];
   currentSortOption: SortOption;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  user: UserData | null;
};

const initialState: InitialState = {
  offers: [],
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  user: null
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
    });

});

export { reducer };
