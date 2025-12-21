import { HousingType } from '../const';
import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 120,
    rating: 4,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Apartment,
    isFavorite: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: 2,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 110,
    rating: 4.5,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Hotel,
    isFavorite: true,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8
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
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude:4.929309666406198,
      zoom: 8
    }
  },
  {
    id: 4,
    image: 'img/apartment-01.jpg',
    isPremium: true,
    pricePerNight: 120,
    rating: 5,
    title: 'Beautiful & luxurious apartment at great location',
    typeOfHousing: HousingType.Room,
    isFavorite: false,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37403,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8
    }
  },
  {
    id: 5,
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
    },
    location: {
      latitude: 0,
      longitude: 0,
      zoom: 0
    }
  },
];
