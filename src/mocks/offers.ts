import { HousingType } from '../const';
import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 100,
    rating: 4.7,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Apartment,
    isFavorite: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    }
  },
  {
    id: 2,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 110,
    rating: 4.85,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Hotel,
    isFavorite: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    }
  },
  {
    id: 3,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 120,
    rating: 4.92,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Room,
    isFavorite: false,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    }
  },
  {
    id: 4,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 130,
    rating: 5,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.House,
    isFavorite: true,
    city: {
      name: 'Cologne',
      location: {
        latitude: 0,
        longitude: 0,
        zoom: 0
      }
    }
  },
];
