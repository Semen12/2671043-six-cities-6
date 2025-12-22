import { createReducer } from '@reduxjs/toolkit';
import { CITY_DEFAULT, SortOption } from '../const';
import { changeCity, changeSort, loadOffers, setOffersDataLoadingStatus } from './action';
import { Offer } from '../types/offer';


type InitialState = {
  cityActive: string;
  offers: Offer[];
   currentSortOption: SortOption;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  offers: [],
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular,
  isOffersDataLoading: false,
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
    });
});

export { reducer };
