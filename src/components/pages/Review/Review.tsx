import { ReviewType } from '../../../mocks/review';

type ReviewProps = {
  review: ReviewType;
};

export default function Review({ review }: ReviewProps): JSX.Element {
  const { userName, avatarUrl, rating, comment, date } = review;
  const ratingPercent = Math.round(rating * 20);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
        </div>
        <span style={{whiteSpace: 'nowrap'}} className="reviews__user-name">{userName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={date}>{new Date(date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}</time>
      </div>
    </li>
  );
}
