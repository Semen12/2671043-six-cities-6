import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, SortOption } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';
import { getCity, getSortOption } from '../app-process/selectors';


export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getIsOffersDataLoading = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getOffer = (state: State) => state[NameSpace.Data].offer;
export const getNearbyOffers = (state: State) => state[NameSpace.Data].nearbyOffers;
export const getComments = (state: State) => state[NameSpace.Data].comments;
export const getIsOfferLoading = (state: State) => state[NameSpace.Data].isOfferLoading;
export const getErrorStatus = (state: State) => state[NameSpace.Data].hasError;


export const getFilteredOffers = createSelector(
  [getOffers, getCity, getSortOption],
  (offers:Offer[], city, sortOption) => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);

    switch (sortOption) {
      case SortOption.PriceHighToLow:
        return filteredOffers.sort((a, b) => b.price - a.price);
      case SortOption.PriceLowToHigh:
        return filteredOffers.sort((a, b) => a.price - b.price);
      case SortOption.TopRatedFirst:
        return filteredOffers.sort((a, b) => b.rating - a.rating);
      default:
        return filteredOffers;
    }
  }
);
