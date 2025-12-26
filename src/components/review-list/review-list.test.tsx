import { render, screen } from '@testing-library/react';
import { ReviewList } from './review-list';
import { Review } from '../../types/review';

const mockReviews = [
  {
    id: '1',
    user: { name: 'Max', avatarUrl: '', isPro: false },
    comment: 'A quiet place.',
    rating: 4,
    date: '2019-05-08T14:13:56.569Z'
  },
  {
    id: '2',
    user: { name: 'Sam', avatarUrl: '', isPro: false },
    comment: 'Nice place.',
    rating: 5,
    date: '2019-05-09T14:13:56.569Z'
  }
] as Review[];

describe('Component: ReviewList', () => {
  it('should render correct number of reviews', () => {
    render(<ReviewList reviews={mockReviews} />);


    expect(screen.getByText('Max')).toBeInTheDocument();
    expect(screen.getByText('Sam')).toBeInTheDocument();

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
