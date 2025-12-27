import { CITIES, HousingType } from '../const';
import { City, DetailedOffer, Location, Offer } from '../types/offer';
import { AuthData, UserData } from '../types/auth-data';
import { Review, ReviewData } from '../types/review';
import faker from 'faker';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { createAPI } from '../services/api';

const housingTypes = Object.values(HousingType);

type CityRandom = typeof CITIES[number];

export const getRandomCity = (cities: readonly CityRandom[]): CityRandom => {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
};
export const makeFakeLocation = (): Location => ({
  latitude: Number(faker.address.latitude()),
  longitude: Number(faker.address.longitude()),
  zoom: faker.datatype.number({ min: 10, max: 13 }),
});

export const makeFakeCity = (): City => ({
  name: faker.address.city(),
  location: makeFakeLocation(),
});

export const makeFakeUser = (): UserData => ({
  email: faker.internet.email(),
  token: faker.datatype.uuid(),
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
  name: faker.name.findName(),
});


const makeFakeUserShort = () => ({
  name: faker.name.findName(),
  avatarUrl: faker.internet.avatar(),
  isPro: faker.datatype.boolean(),
});

export const makeFakeOffer = (): Offer => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.words(),
  previewImage: faker.image.imageUrl(),
  isPremium: faker.datatype.boolean(),
  price: faker.datatype.number({ min: 100, max: 1000 }),
  rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
  isFavorite: faker.datatype.boolean(),
  type: faker.random.arrayElement(housingTypes),
  city: makeFakeCity(),
  location: makeFakeLocation(),
});

export const makeFakeDetailedOffer = (): DetailedOffer => {

  const offer = makeFakeOffer();

  return {
    id: offer.id,
    title: offer.title,
    isPremium: offer.isPremium,
    price: offer.price,
    rating: offer.rating,
    isFavorite: offer.isFavorite,
    type: offer.type,
    city: offer.city,
    location: offer.location,
    // для детальной страницы
    description: faker.lorem.paragraph(),
    bedrooms: faker.datatype.number({ min: 1, max: 5 }),
    goods: faker.random.arrayElements([
      'Wi-Fi',
      'Heating',
      'Kitchen',
      'Cable TV',
    ]),
    host: makeFakeUserShort(),
    images: new Array(3).fill(null).map(() => faker.image.imageUrl()),
    maxAdults: faker.datatype.number({ min: 1, max: 10 }),
  };
};

export const makeFakeReview = (): Review => ({
  id: faker.datatype.uuid(),
  user: makeFakeUserShort(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
  comment: faker.lorem.sentences(),
  date: faker.date.recent().toISOString(),
});

export const makeFakeReviewData = (): ReviewData => ({
  offerId: faker.datatype.uuid(),
  comment: faker.lorem.sentences(),
  rating: faker.datatype.number({ min: 1, max: 5 }),
});

export const makeFakeAuthData = (): AuthData => ({
  login: faker.internet.email(),
  password: faker.internet.password(),
});


export type AppThunkDispatch = ThunkDispatch<
  State,
  ReturnType<typeof createAPI>,
  Action
>;
