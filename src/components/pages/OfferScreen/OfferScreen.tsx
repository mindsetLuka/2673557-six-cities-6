import { Link, useParams, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentForm from '../ReviewForm/CommentForm';
import ReviewsList from '../ReviewsList/ReviewsList';
import Map from '../../Map/Map';
import OfferList from '../OfferList/OfferList';
import Spinner from '../../Spinner/Spinner';
import { RootState, AppDispatch } from '../../../store';
import { fetchOffer, fetchReviews, logout, setUser } from '../../../store/action';
import { AppRoute, AuthorizationStatus } from '../../../const';

export default function OfferScreen(): JSX.Element {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const offer = useSelector((state: RootState) => state.data.currentOffer);
  const nearOffers = useSelector((state: RootState) => state.data.nearOffers);
  const reviews = useSelector((state: RootState) => state.data.reviews);
  const isOfferLoading = useSelector((state: RootState) => state.data.isOfferLoading);
  const authorizationStatus = useSelector((state: RootState) => state.data.authorizationStatus);
  const user = useSelector((state: RootState) => state.data.user);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setUser(null));
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id))
        .catch(() => {
          // Error is handled by redirect to 404
        });
      dispatch(fetchReviews(id));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return (
      <div className="page">
        <div className="container" style={{ padding: '48px 16px' }}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (!offer) {
    return <Navigate to={AppRoute.Unknown} />;
  }
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to="/" className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img src={user.avatarUrl} alt={user.name} style={{ borderRadius: '50%' }} />
                        </div>
                        <span className="header__user-name user__name">{user.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.images.map((src, idx) => (
                <div className="offer__image-wrapper" key={src + String(idx)}>
                  <img className="offer__image" src={src} alt={`Photo ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button className="offer__bookmark-button button" type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${Math.round(offer.rating * 20)}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((g) => (
                    <li className="offer__inside-item" key={g}>{g}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">{offer.host.name}</span>
                  {offer.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>
              <ReviewsList reviews={reviews} />
              {authorizationStatus === AuthorizationStatus.Auth && <CommentForm offerId={id || ''} />}
            </div>
          </div>
          <section className="offer__map map">
            <Map offers={nearOffers} selectedOffer={offer} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList offers={nearOffers} variant="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}


