import { Review } from '../../types/review';
import { ReviewItem } from '../review-item/review-item';


type ReviewListProps = {
  reviews: Review[];
};

export const ReviewList = ({ reviews }: ReviewListProps) => (
  <ul className="reviews__list">
    {reviews.map((review) => (
      <ReviewItem key={review.id} review={review} />
    ))}
  </ul>
);
