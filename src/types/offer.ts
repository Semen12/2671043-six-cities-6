import { HousingType } from '../const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};
export type City = {
  name: string;
  location: Location;
}
export type Offer = {
  id:number;
  title:string;
  image:string;
  isPremium:boolean;
  pricePerNight:number;
  rating:number;
  isFavorite:boolean;
  typeOfHousing:HousingType;
  city: City;
  location: Location;
}
