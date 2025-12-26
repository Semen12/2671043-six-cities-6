import { createSlice } from '@reduxjs/toolkit';
import { DetailedOffer, Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import { fetchOfferDataAction, fetchOffersAction, postCommentAction } from '../api-actions';

type AppData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  hasError: boolean;
};

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  hasError: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    clearOfferData: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.comments = [];
      state.hasError = false;
    }
  },
  extraReducers(builder) {
    builder

      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })


      .addCase(fetchOfferDataAction.pending, (state) => {
        state.isOfferLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferDataAction.fulfilled, (state, action) => {
        const { offer, nearby, comments } = action.payload;
        state.offer = offer;
        state.nearbyOffers = nearby;
        state.comments = comments;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferDataAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.hasError = true;
      })


      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  },
});

export const { clearOfferData } = appData.actions;
