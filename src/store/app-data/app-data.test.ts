import { describe, it, expect } from 'vitest';
import { appData, clearOfferData } from './app-data';
import { makeFakeDetailedOffer, makeFakeOffer } from '../../utils/mocks';
import { fetchOffersAction, setFavoriteAction } from '../api-actions';


describe('AppData Slice', () => {
  const initialState = {
    offers: [],
    isOffersDataLoading: false,
    offer: null,
    nearbyOffers: [],
    comments: [],
    isOfferLoading: false,
    hasError: false,
    favorites: [],
  };

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const result = appData.reducer(undefined, emptyAction);
    expect(result).toEqual(initialState);
  });

  it('should clear offer details with "clearOfferData"', () => {
    const modifiedState = {
      ...initialState,
      offer: makeFakeDetailedOffer(),
      nearbyOffers: [makeFakeOffer()],
      comments: [],
      hasError: true
    };

    const result = appData.reducer(modifiedState, clearOfferData());

    expect(result.offer).toBeNull();
    expect(result.nearbyOffers).toEqual([]);
    expect(result.hasError).toBe(false);
  });


  it('should set loading status to true with "fetchOffersAction.pending"', () => {
    const result = appData.reducer(initialState, fetchOffersAction.pending('', undefined));
    expect(result.isOffersDataLoading).toBe(true);
  });

  it('should set offers and remove loading with "fetchOffersAction.fulfilled"', () => {
    const offers = [makeFakeOffer()];
    const result = appData.reducer(initialState, fetchOffersAction.fulfilled(offers, '', undefined));

    expect(result.offers).toEqual(offers);
    expect(result.isOffersDataLoading).toBe(false);
  });


  it('should update favorites flag in offers and add to favorites list', () => {
    const offerNotFavorite = makeFakeOffer();
    offerNotFavorite.isFavorite = false;
    offerNotFavorite.id = '1';

    const offerFavorite = { ...offerNotFavorite, isFavorite: true };

    const state = {
      ...initialState,
      offers: [offerNotFavorite],
      favorites: []
    };


    const result = appData.reducer(state, setFavoriteAction.fulfilled(offerFavorite, '', { offerId: '1', status: 1 }));


    expect(result.offers[0].isFavorite).toBe(true);

    expect(result.favorites).toHaveLength(1);
    expect(result.favorites[0]).toEqual(offerFavorite);
  });

  it('should remove from favorites list if isFavorite becomes false', () => {
    const offerFavorite = makeFakeOffer();
    offerFavorite.isFavorite = true;
    offerFavorite.id = '1';

    const offerNotFavorite = { ...offerFavorite, isFavorite: false };

    const state = {
      ...initialState,
      offers: [offerFavorite],
      favorites: [offerFavorite]
    };

    const result = appData.reducer(state, setFavoriteAction.fulfilled(offerNotFavorite, '', { offerId: '1', status: 0 }));

    expect(result.offers[0].isFavorite).toBe(false);
    expect(result.favorites).toHaveLength(0);
  });
});
