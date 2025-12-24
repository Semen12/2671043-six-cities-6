import { UserData } from './auth-data';

export type Review = {
  id: string;
  user: Pick<UserData, 'name' | 'avatarUrl' | 'isPro'>;
  rating: number;
  comment: string;
  date: string;
};


export type ReviewData = {
  offerId: string;
  comment: string;
  rating: number;
};
