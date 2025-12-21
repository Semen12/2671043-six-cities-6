import { createReducer } from '@reduxjs/toolkit';
import { CITY_DEFAULT, SortOption } from '../const';
import { offers } from '../mocks/offers';
import { changeCity, changeSort, fillOffers } from './action';

const initialState = {
  offers: offers,
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityActive = action.payload;

    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;

    })
    .addCase(changeSort, (state, action) => {
      state.currentSortOption = action.payload;
    });
});

export { reducer };
