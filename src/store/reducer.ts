import { createReducer } from '@reduxjs/toolkit';
import { CITY_DEFAULT } from '../const';
import { offers } from '../mocks/offers';
import { changeCity, fillOffers } from './action';

const initialState = {
  offers: offers,
  cityActive: CITY_DEFAULT,
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityActive = action.payload;

    })
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;

    });
});

export { reducer };
