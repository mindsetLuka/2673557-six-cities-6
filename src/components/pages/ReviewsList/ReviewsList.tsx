import Review from '../Review/Review';
import { ReviewType } from '../../../mocks/review';

type ReviewsListProps = {
    reviews: ReviewType[];
};

export default function ReviewsList({ reviews }: ReviewsListProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((r) => (
          <Review key={r.id} review={r} />
        ))}
      </ul>
    </section>
  );
}
