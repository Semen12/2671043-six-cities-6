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
  id:string;
  title:string;
  previewImage:string;
  isPremium:boolean;
  price:number;
  rating:number;
  isFavorite:boolean;
  type:HousingType;
  city: City;
  location: Location;
}
