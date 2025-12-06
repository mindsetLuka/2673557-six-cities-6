import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Offer } from '../../../mocks/offers';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../../store/action';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { RootState, AppDispatch } from '../../../store';

type OfferCardProps = {
  offer: Offer;
  variant?: 'cities' | 'near-places' | 'favorites';
  onOfferHover?: (offerId: string | null) => void;
};

const OfferCardComponent = (
  { offer, variant = 'cities', onOfferHover }: OfferCardProps
): JSX.Element => {
  const {
    isPremium,
    previewImage: imageSrc,
    price,
    isFavorite: isBookmarked,
    rating,
    title,
    type,
  } = offer;

  const ratingPercent = Math.round(rating * 20);

  const articleClass = `${variant}__card place-card`;
  const imageWrapperClass = `${variant}__image-wrapper place-card__image-wrapper`;
  const imageSize = variant === 'favorites' ? { width: 150, height: 110 } : { width: 260, height: 200 } as const;

  const handleMouseEnter = useCallback(() => {
    onOfferHover?.(offer.id);
  }, [onOfferHover, offer.id]);

  const handleMouseLeave = useCallback(() => {
    onOfferHover?.(null);
  }, [onOfferHover]);

  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((state: RootState) => state.data.authorizationStatus);
  const navigate = useNavigate();

  const handleBookmarkClick = useCallback(() => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    dispatch(toggleFavorite(offer.id, isBookmarked));
  }, [authorizationStatus, navigate, dispatch, offer.id, isBookmarked]);

  return (
    <article
      className={articleClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={imageSrc} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
          <button onClick={handleBookmarkClick} className={`place-card__bookmark-button ${isBookmarked ? 'place-card__bookmark-button--active ' : ''}button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isBookmarked ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
};

const OfferCard = React.memo(OfferCardComponent);

export default OfferCard;


