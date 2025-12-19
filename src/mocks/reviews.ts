import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-04-24T12:00:00.000Z',
  },
];
