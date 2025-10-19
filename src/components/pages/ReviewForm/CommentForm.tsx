import { useState, FormEvent, ChangeEvent, Fragment } from 'react';

interface CommentFormData {
  rating: string;
  comment: string;
}

function CommentForm(): JSX.Element {
  const [formData, setFormData] = useState<CommentFormData>({
    rating: '',
    comment: ''
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: evt.target.value
    });
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: evt.target.value
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setFormData({
      rating: '',
      comment: ''
    });
  };

  const isFormValid = formData.rating !== '' && formData.comment.length >= 50 && formData.comment.length <= 300;

  const getRatingTitle = (value: number): string => {
    switch (value) {
      case 5:
        return 'perfect';
      case 4:
        return 'good';
      case 3:
        return 'not bad';
      case 2:
        return 'badly';
      case 1:
        return 'terribly';
      default:
        return '';
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {([5, 4, 3, 2, 1] as const).map((value) => {
          const id = `rating-${value}`;
          const title = getRatingTitle(value);

          return (
            <Fragment key={value}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={String(value)}
                id={id}
                type="radio"
                checked={formData.rating === String(value)}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={id}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleCommentChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
