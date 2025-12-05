import { HousingType } from '../const';

type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
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
}
