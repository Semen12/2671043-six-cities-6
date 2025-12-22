import { SortOption } from '../const';
import { Offer } from '../types/offer';


export const sortOffers = (offers: Offer[], sortOption: SortOption): Offer[] => {

  const offersCopy = [...offers];

  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.price - b.price);
    case SortOption.PriceHighToLow:
      return offersCopy.sort((a, b) => b.price - a.price);
    case SortOption.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    case SortOption.Popular:
    default:
      return offersCopy;
  }
};
