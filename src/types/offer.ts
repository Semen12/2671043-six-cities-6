import { HousingType } from '../const';
import { UserData } from './auth-data';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type City = {
  name: string;
  location: Location;
};
export type Offer = {
  id: string;
  title: string;
  previewImage: string;
  isPremium: boolean;
  price: number;
  rating: number;
  isFavorite: boolean;
  type: HousingType;
  city: City;
  location: Location;
};

export type DetailedOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Pick<UserData, 'name' | 'avatarUrl' | 'isPro'>;
  images: string[];
  maxAdults: number;
};
