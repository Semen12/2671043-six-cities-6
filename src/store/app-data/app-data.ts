import { createSlice } from '@reduxjs/toolkit';
import { DetailedOffer, Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { NameSpace } from '../../const';
import { fetchFavoritesAction, fetchOfferDataAction, fetchOffersAction, postCommentAction, setFavoriteAction } from '../api-actions';

type AppData = {
  offers: Offer[];
  isOffersDataLoading: boolean;
  offer: DetailedOffer | null;
  nearbyOffers: Offer[];
  comments: Review[];
  isOfferLoading: boolean;
  hasError: boolean;
  favorites: Offer[];
};

const initialState: AppData = {
  offers: [],
  isOffersDataLoading: false,
  offer: null,
  nearbyOffers: [],
  comments: [],
  isOfferLoading: false,
  hasError: false,
  favorites: [],
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
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })

      .addCase(setFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        const offerIndex = state.offers.findIndex((o) => o.id === updatedOffer.id);
        if (offerIndex !== -1) {
          state.offers[offerIndex].isFavorite = updatedOffer.isFavorite;
        }

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer.isFavorite = updatedOffer.isFavorite;
        }

        const nearbyIndex = state.nearbyOffers.findIndex((o) => o.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex].isFavorite = updatedOffer.isFavorite;
        }

        if (updatedOffer.isFavorite) {
          state.favorites.push(updatedOffer);
        } else {
          state.favorites = state.favorites.filter((o) => o.id !== updatedOffer.id);
        }
      });
  },
});

export const { clearOfferData } = appData.actions;
