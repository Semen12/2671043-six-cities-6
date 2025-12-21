import { SortOption } from '../const';
import { Offer } from '../types/offer';


export const sortOffers = (offers: Offer[], sortOption: SortOption): Offer[] => {

  const offersCopy = [...offers];

  switch (sortOption) {
    case SortOption.PriceLowToHigh:
      return offersCopy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    case SortOption.PriceHighToLow:
      return offersCopy.sort((a, b) => b.pricePerNight - a.pricePerNight);
    case SortOption.TopRatedFirst:
      return offersCopy.sort((a, b) => b.rating - a.rating);
    case SortOption.Popular:
    default:
      return offersCopy;
  }
};
